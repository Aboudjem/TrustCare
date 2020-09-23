pragma solidity =0.7.0;

contract HealthInsurance {

    struct Fund {
        uint16 countryCode;
        uint256[] rights;
    }

    mapping(address => mapping(uint256 => Fund)) funds;

}