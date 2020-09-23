pragma solidity 0.6.2;

contract HealthInsurancesRegistry {
    struct Fund {
        uint16 countryCode;
        uint256[] rights;
    }
    mapping(address => mapping(uint256 => Fund)) funds;

}
