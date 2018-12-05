# Red Team War Games

Welcome to the game.

The war games are a series of episodes in which each player or team is both the blue team and the red team for attack-defense style competitions.

## Table of Contents

#### Important information
* [Legalities](#important)
* [Tutorials](/tutorials)
* [Kali template VM](#kali-war-games-vm)

#### Episodes:
* [Episode 1: The Wrapping of Cats](#episode-1-the-wrapping-of-cats)

## Episode 1: *The Wrapping of Cats*
`Coming: 01/02/2019`



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

## Kali War Games VM

The provided template is a Kali 2018.3a VM pre configured with VM tools, Nessus, and OpenVAS pre-installed.

The username is `root` and the password is `toor` for the VM as well as Nessus. For OpenVAS, the login username is `admin` and the password is `c21f74bb-cb53-4ebc-b010-23a1d738c3a8`. **These webservers are configured to listen on all interfaces, so keeping this VM to share the same IP as your host device is highly advised.** Changing credentials is also suggested

You will have to provide your own key for Nessus. This can be obtained by going to [this link](https://www.tenable.com/products/nessus-home) and registering for Nessus home.

Nessus will start on boot, and you can access it by going to http://localhost:8834/

OpenVAS needs to be started by running `openvas-start` in the terminal. A browser window will pop up when ready, but it can be found at http://localhost:9392
