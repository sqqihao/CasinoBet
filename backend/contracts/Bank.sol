// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IBank {
    function addFunds(address _addr, uint256 _amount) external ;
    function subFunds(address _addr, uint256 _amount) external ;
    function deposit() external payable ;
    function withDraw(uint256 _amount) external ;
    function balanceOf(address _addr) external returns(uint256);
}
contract Bank is Ownable{
    // bytes32 public constant ADMIN = keccak256("ADMIN");
    // bytes32 public constant OPERATOR = keccak256("OPERATOR");

    mapping(address => uint256) private funds;
    address[] public allowedCallers;

    event WithDraw(address _addr, uint256 _amount);
    event Deposit(address _addr, uint256 _amount);

    constructor() Ownable(msg.sender){
        // 将部署者赋予 ADMIN 设置为 OPERATOR 的管理员角色
        // _setRoleAdmin(OPERATOR, ADMIN);
        // 当前sender赋予管理角色
        // _grantRole(ADMIN, msg.sender);
    }

    function setAllowCaller (address _allowedCaller) public onlyOwner() {
        allowedCallers.push(_allowedCaller);
    }

    modifier onlyAllowedCaller() {
        //require(msg.sender == allowedCaller, "Access denied: Caller is not the allowed contract");
        bool allow = false;
        for(uint8 i=0; i<allowedCallers.length;i++){
            if(msg.sender == allowedCallers[i])allow=true;
        }
        require(allow, "Access denied: Caller is not the allowed contract");
        _;
    }
    function addFunds(address _addr, uint256 _amount) public onlyAllowedCaller(){// onlyRole(ADMIN) { 
        funds[_addr] = funds[_addr] + _amount;
    }
    function subFunds(address _addr, uint256 _amount) public  onlyAllowedCaller(){//onlyRole(ADMIN) {
        funds[_addr] = funds[_addr] - _amount;
    }
    function balanceOf(address _addr) external view returns(uint256) {
        return funds[_addr];  
    }
    function withDraw(uint256 _amount) external {
        require(_amount>0 ,"amount to small");
        require(funds[msg.sender]>_amount,"no enougth amount");
        funds[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit WithDraw(msg.sender, _amount);
    }
    function deposit() external payable{
        require(msg.value>0 ,"amount to small");
        funds[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
}