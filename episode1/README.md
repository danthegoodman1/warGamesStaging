# Red Team War Games
## Episode 1: *The Wrapping of Cats*

### Difficulty: 2/10

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
`linux` `bash` `web` `rest api` `c` `web requests`

### Scenario:

You are given a binary to give API access to, `catWrapper`. This binary simply wraps the bash command, `cat`. However, it is not as robust. Using your knowledge of bash, Linux, and some C, you must allow the service to work while protecting its functionality.

## Timeline

#### Development: `1 week`
#### Development Hints:

You are going to need to build an RESTful API. My favorite by far and I think the easiest to use too is [Express](https://expressjs.com/), a Node.js API framework.

## Requirements

#### Point System:

Points will be based on 2 factors, blue team points and red team points. Blue team points come from having your services up and running. Red team points come from successful red team actions and are reported using [the attack report google form](https://goo.gl/forms/m3CJSw4wYZuicbFI2).

#### Reporting:

You will report all attacks on [this attack report google form](https://goo.gl/forms/m3CJSw4wYZuicbFI2). Anytime you make an intrusion, lateral movement, process migration, privilege escallation, persistence, website defacement, file system deletion, etc., you should fill out the form. It is how your Red Team points will be calculated.

#### Attack:

Prevent the points API from accessing opponents cat APIs. You are not allowed to attack the points API, only opponents cat APIs. Do what ever you want to prevent that from happening.

#### Defense:

You must provide API access to this `catWrapper` binary, as well as protect your server. One of the many files in the home directory is the file that the server must be able to access using a GET Request and a POST request. When the service is able to access the file, you gain points. The system randomly chooses a file so that you are unable to hardcode results. For all requests, the response must be the output of the command only. All files should be located in the home directory of your server. **You must run on port 8082**.

For the GET Request, the expected url is as follows:
`http://{your-ip}:8082/{path-to-file}`

For the POST Request, the expected url and body is as follows:

URL:
`http://{your-ip}:8082/cat`

Body:
```js
{
	"path": "{path-to-file}"
}
```

## Source Code
The following source code is for the binary that is expected to cat the results. This must be used.
`catWrapper`:
```c
#include <stdio.h>
#include <unistd.h>

int main(int argc, char **argv) {
 char cat[] = "cat ";
 char *command;
 size_t commandLength;

 commandLength = strlen(cat) + strlen(argv[1]) + 1;
 command = (char *) malloc(commandLength);
 strncpy(command, cat, commandLength);
 strncat(command, argv[1], (commandLength - strlen(cat)) );

 system(command);
 return (0);
}
```

## Post competition
The winner will be determined by who ever has the most amount of points in the end. All source code will be shared by the competitors. In the event that cheating has occurred (source code does not match protection capabilities of the API), the winner will be the highest point holder with legal source code.
