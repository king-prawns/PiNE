# Setup RPi

## Prerequisite

[Buy](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) a Raspberry Pi kit:

- Raspberry Pi
- Power supply
- Micro-hdmi to HDMI cable
- Micro SD + reader
- (optional) Case + mouse + keyboard

## Notes

- [Setting up](https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up/0) your Raspberry Pi
- [Generate and Add](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) new SSH key
- [Install Docker](https://dev.to/elalemanyo/how-to-install-docker-and-docker-compose-on-raspberry-pi-1mo)
- Enable SSH: `RPi Configuration > Interfaces > SSH Enabled`
- Copy docker-compose.yml from the repo to to RPi: `scp docker-compose.yml pi@IP_ADDRESS:`
- Login:
  - `export CR_PAT=GITHUB_PERSONAL_ACCESS_TOKEN`
  - `echo $CR_PAT | docker login ghcr.io -u GITHUB_USERNAME --password-stdin`
- Run `docker-compose pull`
- Run `docker-compose up -d`
