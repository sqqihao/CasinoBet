pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Bank.sol";

contract ChuckALuck is VRFConsumerBase{
    struct Bet {
        address beter;
        uint256 bet_time;
        uint256 bet_num;
        uint256 bet_amounts;
    }
    event WinFund(address addr,uint256 amounts);
    // Bet[] bets;
    mapping(bytes32=>Bet) public bets;

    Bank public bank;
    bytes32 internal _keyHash;
    uint internal _fee;

    
    constructor(address vrfCoordinator, address linkToken, bytes32 keyHash, uint fee, address _addr) VRFConsumerBase(vrfCoordinator, linkToken) {
        _keyHash = keyHash;
        _fee = fee;
        bank = Bank(_addr);
    }
    function _random(uint mod) internal view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp))) % mod;
    }
    function _hash() internal view returns (bytes32) {
        return bytes32(keccak256(abi.encodePacked(block.prevrandao, block.timestamp)));
    }
    function place_bet(uint256  _bet_num, uint256 _bet_amounts) public {
        Bet memory bet = Bet(
            msg.sender,
            block.timestamp,
            _bet_num,
            _bet_amounts);
            
        //需要对接chainlink的话把 bytes32 req和  fulfillRandomness删除即可
        //bytes32 req = requestRandomness(_keyHash, _fee);
        bytes32 req = _hash();

        bank.subFunds(msg.sender, _bet_amounts);
        bets[req] = bet;

        //手动调用
        fulfillRandomness(req, _random(100));
    }
    function _expand(uint randomValue, uint n, uint mod, uint add) internal pure returns (uint[] memory expandedValues) {
        expandedValues = new uint[](n);
        for (uint i = 0; i < n; i++) {
            expandedValues[i] = (uint(keccak256(abi.encode(randomValue, i))) % mod) + add;
        }
        return expandedValues;
    }
    function calcWinner(Bet memory bet,uint[] memory _roll) public pure returns(uint256){
        uint c = 0;
        for(uint i = 0; i < _roll.length; i ++) {
            if(_roll[i] == bet.bet_num) {
                c += 1;
            }
        }

        if(c == 1) {
            // 1:1 
            return bet.bet_amounts * 2;
        } else if(c == 2) {
            // 2:1 
            return bet.bet_amounts * 3;
        } else if(c == 3) {
            // 10:1 
            return bet.bet_amounts * 11;
        }
        return 0;
    }
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override  {
        uint[] memory _roll = _expand(randomness, 3, 6, 1);
        Bet memory bet = bets[requestId];
        uint256 winMoney = calcWinner(bet, _roll);
        if(winMoney>0){
            bank.addFunds(bet.beter, winMoney);
            emit WinFund(bet.beter, winMoney);
        }else{
            //说明没有赢，所以不需要记录
            // bank.addFunds(address(this), winMoney);
            // emit WinFund(address(this), winMoney);
        }
    }

}