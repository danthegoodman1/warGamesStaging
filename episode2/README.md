# Red Team War Games
## Episode 2: Inventorious

### Difficulty: 5/10

## IMPORTANT

**DO NOT SCAN DEVICES YOU ARE NOT AUTHORIZED TO**
OpenVAS and Nessus both try to access devices in various ways during the later stages of their scans.

OpenVAS will attempt a small ssh bruteforce attack on the server. If successful, you will have committed a felony under the CFAA*. Additionally, it will try to brute force FTP servers.

Nessus will attempt to screenshot VNC servers, and bruteforce FTP servers. These fall under the same as above.

**TL;DR: NEVER SCAN A DEVICE YOU ARE NOT AUTHORIZED TO**

`nmap` by default is fine though...

\*Computer Fraud and Abuse Act (CFAA)
https://en.wikipedia.org/wiki/Computer_Fraud_and_Abuse_Act
Title 18 U.S.Code Chapter 47  Part? § 1030

### Topics:
`linux` `web` `database` `rest api` `web requests`

### Scenario:

You are in charge of developing an inventory management system for VulnLogistics, a shipment logistics company. They are in need of an inventory management system that can list the status of packages being delivered. This inventory management system must have a UI for listing, creating, and deleting elements. Additionally, it must have a RESTful API to handle the same operations.

## Timeline

#### Development: `2 weeks`
#### War: `2 weeks`

## Requirements

#### Point System:

Points will be based on 2 factors, blue team points and red team points. Blue team points come from having your services up and running. Red team points come from successful red team actions and are reported using [the attack report google form]().

#### Reporting:

You will report all attacks on [this attack report google form](). Anytime you make an intrusion, lateral movement, process migration, privilege escallation, persistence, website defacement, file system deletion, etc., you should fill out the form. It is how your Red Team points will be calculated.

#### Attack:

Prevent the scoreBoardAPI from being able to perform database operations, or load data, from the enemy's webapps.

#### Defense:

Keep your webapp alive. The scoreBoardAPI should be able to load the data from a browser, as well as from an internal API.

The webapp UI must be able to list currently stored entries, with the following elements: `origin`, `shipment time`, `destination`, `status`, `sender`, `receiver`. It must also be able to create, update, search for, and delete entries from the list/database.

The RESTful API must be able to perform the same operations as the UI, list, search, update, create, delete. Listing will come from the appropriate GET requests, as well as searching. Creation will come from a POST request. Updating will come from a PUT request. Deletion will come from a DELETE request.

## Post Competition

The winner will be determined by who ever has the most amount of points in the end. All source code will be shared by the competitors. In the event that cheating has occurred (source code does not match protection capabilities of the API), the winner will be the highest point holder with legal source code.
