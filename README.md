# Cyber War Games

Welcome to the game.

The war games are a series of episodes in which each player or team is both the blue team and the red team for attack-defense style competitions.

## Table of Contents

#### Important information
* [Legalities](#important)
* [What you will learn](#learning)
* [Tutorials](/tutorials)
* [Kali template VM](#kali-war-games-vm)
* [Website](https://udwargames.com)
* [API Documentation](https://udwargames.com/api/docs)

#### Episodes:
* [Episode 1: The Wrapping of Cats](#episode-1-the-wrapping-of-cats)



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

## Learning

Throughout the War Games, you will learn many skills and become many things.

#### Red Teamer

You will learn to become a competent red team member, someone who can effectively pivot from vulnerability scanning to exploitation. Additionally, you will learn how to look for new or non-scannable vulnerabilities, and build your own exploits.

#### Web Developer

You will learn how to build real web apps that perform different tasks, and their associated RESTful APIs securely. You will build these web apps and RESTful APIs with what ever language you choose, and master it.

#### Programmer

You will be forced to learn enough about new programming languages to be able to read code, and understand what is going on. You will learn all of the terms and programming techniques to be able to google your way through any development task in any language.

#### Linux Ninja

You will learn how to use Linux servers. Real Linux servers. You will learn how to run services on them, how to secure them, how to operate on them. You will become amazing with Linux using only the terminal.

#### How to Learn from Failure

You will learn this all through failure. When someone breaks your code, and points out a flaw, it is the most valuable learning opportunity you will receive. If you fail here, that is good. If you fail in the real world, there are consequences.

## Kali War Games VM

The provided template is a Kali 2018.3a VM pre configured with VM tools, Nessus, and OpenVAS pre-installed. It can be [downloaded from here.](https://udelvip.nyc3.digitaloceanspaces.com/Kali%202018.3a%20Wargames.zip)

The username is `root` and the password is `toor` for the VM as well as Nessus. For OpenVAS, the login username is `admin` and the password is `c21f74bb-cb53-4ebc-b010-23a1d738c3a8`. **These webservers are configured to listen on all interfaces, so keeping this VM to share the same IP as your host device is highly advised.** Changing credentials is also suggested

You will have to provide your own key for Nessus. This can be obtained by going to [this link](https://www.tenable.com/products/nessus-home) and registering for Nessus home.

Nessus will start on boot, and you can access it by going to http://localhost:8834/

OpenVAS needs to be started by running `openvas-start` in the terminal. A browser window will pop up when ready, but it can be found at http://localhost:9392
