pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Bank.sol";
contract Roulette is Ownable {
    //bank必须是内部的，不能通过外部调用
    Bank public bank;
    struct Bet {
        address beter;
        uint256 bet_type;
        uint256 bet_time;
        uint256 bet_num;
        uint256 bet_amounts;
    }
    Bet[] public bets;
    uint256[] public rolleds;

    event PlaceBet (
        Bet bet
    );
    event WinFund(address addr,uint256 amounts);

    constructor(address _addr)  Ownable(msg.sender){
        bank = Bank(_addr);
    }
    
    function place_bet(uint256 _bet_type, uint256 _bet_num, uint256 _bet_amounts) public {
        Bet memory bet = Bet(
            msg.sender,
            _bet_type,
            block.timestamp,
            _bet_num,
            _bet_amounts);

        bets.push(bet);
        bank.subFunds(msg.sender, _bet_amounts);
        emit PlaceBet(bet);
    }

    function betsLength() external view returns(uint256){
        return bets.length;
    }
    function getRollLength() external view returns(uint256){
        return rolleds.length;
    }

    //Replace with chainlink
    function _random(uint mod) internal view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % mod;
    }

    function _is_red(uint roll) internal pure returns (bool) {
        if (roll < 11 || (roll > 18 && roll < 29)) {
        // Red odd, black even
            return roll % 2 == 1;
        } else {
            return roll % 2 == 0;
        }
    }
    function calcWinner(Bet memory bet,uint256 _roll) public pure returns(uint256){
        if(bet.bet_type == 0) {
            // 0 = red, 1 = black
            if (bet.bet_num == (_is_red(_roll) ? 0 : 1)) {
                return bet.bet_amounts * 2;
            }
        }else if( bet.bet_type == 1) {
            // 0 = even, 1 = odd
            if (bet.bet_num == (_roll % 2)) {
                return bet.bet_amounts * 2;
            }
        }
        return 0;
    }

    function play() public  onlyOwner() {
        uint256 _roll = _random(37);
        rolleds.push(_roll);
        for(uint i=0; i<bets.length; i++) {
            uint256 winMoney = calcWinner(bets[i], _roll);
            if(winMoney>0){
                bank.addFunds(bets[i].beter, winMoney);
                // bets[i].beter.
                emit WinFund(bets[i].beter, winMoney);
            }else{
                //说明没有赢，所以不需要记录
                // bank.addFunds(address(this), winMoney);
                // emit WinFund(address(this), winMoney);
            }
        }
        delete bets;
    }
}