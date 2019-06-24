# Debrief
---
### Info
**Vulnerability:** `Command Injection`
**Severity:** `10/10`

---
### Summary
The provided API has a `command injection vulnerability`

---

### Defense Solutions

The first suggestion would be to use programming level file reading instead of system calls. As will all command injection, taking user input opens up many attack vectors and required an increased security effort. For Node.js, using the `fs` module would be the best way to read files securely, as it won'y allow for bash command injection.
