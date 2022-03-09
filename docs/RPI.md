# Setup RPi

## Prerequisite

[Buy](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) a Raspberry Pi kit:

- Raspberry Pi
- Power supply
- Micro-hdmi to HDMI cable
- Micro SD + reader
- (optional) Case + mouse + keyboard

## Setup

- [Setting up](https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up/0) your Raspberry Pi
- [Generate and Add](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) new SSH key
- [Install Docker](https://dev.to/elalemanyo/how-to-install-docker-and-docker-compose-on-raspberry-pi-1mo)
- Enable SSH: `RPi Configuration > Interfaces > SSH Enabled`
- Copy docker-compose.yml from the repo to RPi: `scp docker-compose.yml pi@IP_ADDRESS:`
- Run `docker-compose pull`
- Run `docker-compose up -d`

## Troubleshooting

### docker-compose up

Error: `node::GetCurrentTimeInMicroseconds(): Assertion (0) == (uv_gettimeofday(&tv))' failed.`

Run the following commands on RPi:

```bash
# Get signing keys to verify the new packages, otherwise they will not install
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 04EE7237B7D453EC 648ACFD622F3D138

# Add the Buster backport repository to apt sources.list
echo 'deb http://httpredir.debian.org/debian buster-backports main contrib non-free' | sudo tee -a /etc/apt/sources.list.d/debian-backports.list

sudo apt update
sudo apt install libseccomp2 -t buster-backports
```
