# Red Team War Games

---

## Episode 1: *The Wrapping of Cats*

### Difficulty: `2/10`

## IMPORTANT

**DO NOT SCAN DEVICES YOU ARE NOT AUTHORIZED TO**
OpenVAS and Nessus both try to access devices in various ways during the later stages of their scans.

OpenVAS will attempt a small ssh bruteforce attack on the server. If successful, you will have committed a felony under the CFAA*. Additionally, it will try to brute force FTP servers.

Nessus will attempt to screenshot VNC servers, and bruteforce FTP servers. These fall under the same as above.

**TL;DR: NEVER SCAN A DEVICE YOU ARE NOT AUTHORIZED TO**



\*Computer Fraud and Abuse Act (CFAA)
https://en.wikipedia.org/wiki/Computer_Fraud_and_Abuse_Act
Title 18 U.S.Code Chapter 47  Part? § 1030

### Topics:
`linux` `bash` `web` `rest api` `web requests`

### Scenario:

You are protecting an API that returns the file contents of a random file in the `accessFiles` folder. This API is vulnerable, and needs to maintain full functionality at all costs. Find the vulnerability in the API, and fix it to allow functionality while protecting against malicious users.

<!-- ## Timeline

#### Development: `1 week` -->
#### Development Hints:

You may want to look into native libraries.

## Requirements

#### Point System:

Points will be based on 2 factors, blue team points and red team points. Blue team points come from having your services up and running. Red team points come from successful red team actions and are reported using [the attack report google form](https://goo.gl/forms/m3CJSw4wYZuicbFI2).

#### Reporting:

You will report all attacks on [this attack report google form](https://goo.gl/forms/m3CJSw4wYZuicbFI2). Anytime you make an intrusion, lateral movement, process migration, privilege escallation, persistence, website defacement, file system deletion, etc., you should fill out the form. It is how your Red Team points will be calculated.

#### Attack:

Prevent the points API from accessing opponents cat APIs. You are not allowed to attack the points API, only opponents cat APIs. Do what ever you want to prevent that from happening.

#### Defense:

You must be able to return the contents of the requested file, as well as protect your server. One of the many files in the home directory is the file that the server must be able to access using a GET Request and a POST request. When the service is able to access the file, you gain points. The system randomly chooses a file. For all requests, the response must be the output of the command only.

For the GET Request, the expected url is as follows:
`http://{your-ip}:13001/{path-to-file}`

For the POST Request, the expected url and body is as follows:

URL:
`http://{your-ip}:13001/cat`

Body:
```js
{
	"path": "{path-to-file}"
}
```
