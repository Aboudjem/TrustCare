# Infrachain challenge

<p align="center">
  <img width="144" height="118" src="https://imgur.com/RfvoSDX.png">
</p>

The Infrachain Challenge was a hackathon focused on Blockchain in public sector organized by Infrachain in September 2020. In this repository you will be able to see the code developped by the Tokeny-PwC team.

## Presentation 

<p align="center">
  <img width="230" height="110" src="https://imgur.com/HoooTrT.png">
</p>

We decided to developped a new system based on blockchain, called "Trust Care" for the health insurance company to fight fraud and to have smooth and faster transactions between all the counterparties.

You will find below the workflow of our application.To make it simple, a doctor publishes a consultation on the blockchain via a smart contract (DoctorsRegistry.sol) which will then be validated by the patient (PatientsRegistry.sol) as well as by the patient's health insurance company (HealthInsurancesRegistry.sol). All this using the inheritance with the Trustcare.sol contract that links them together as well as to create, update or get a transaction. Each of these contracts are registries i.e in addition to doing what is described above, they allow you to add, update or delete a patient, doctor or health insurance company. 

<p align="center">
  <img width="500" height="400" src="https://imgur.com/8Z1feqX.png">
</p>


#### Problems solved

1. False consultations by doctors.
2. False authorisation to practice for doctors.
3. False consultations by doctors-patients within certains conditions like 2 consultations in less than 3 minutes
4. False medical certificates, prescriptions or false work stoppages by patients.


#### Futur improvement

1. Integration of a Token Euro in case the European Central Bank develops one
2. Integration of the digital health book developped by the CNS
3. Creation of dedicated machine learning algorithms for a better fraud detection and to have more information on citizens behaviours 
