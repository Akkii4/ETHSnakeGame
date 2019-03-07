pragma solidity ^0.5.4;

contract SnakeGame{
	uint  points=0;

	function addPoints(uint _points)public{
		points+=_points;
		return;
	}

	function getPoints() public view returns(uint){
		return points;
	}

	function gameOver() public{
		points=0;
	}

}