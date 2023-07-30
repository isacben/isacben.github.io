---
layout: post
title:  "TIL: How to install PICO-8 on Raspberry Pi"
date:   2023-07-30 00:00:00 -0000
categories: raspberry-pi
---

I am currently building a handheld gaming device to play PICO-8 games on a physical console. I am using a Raspberry Pi Zero. The project process and progress is here:

[https://github.com/isacben/picoboy-dev](https://github.com/isacben/picoboy-dev)

## Preparation

First I installed Raspberry Pi OS in my SD card, making sure to **configure the WiFi from the Mac**, while I was creating the SD card.

## Installation

Upload PICO-8 installer to the Raspberry Pi OS:

```
# scp pico-8_0.2.5g_raspi.zip pi@raspberrypi.local:~/
```

Connect to the Pi and unzip the file:

```
# ssh pi@raspberrypi.local
# unzip pico-8_0.2.5g_raspi.zip
```

Configure the PI to boot to the console, and not to the Desktop:

```
sudo raspi-config
```

Go to: `System Options > Boot / Auto Login > B2 Console Autologin`


Add these lines to the `.bashrc` file (in your home directory): 

```
# vi .bashrc
```

Add this:

```
# PICO-8
sudo /home/pi/pico-8/pico8_dyn -SPLORE
```

Then install these dependencies:

```
# sudo apt-get install libsdl2-dev
# sudo apt-get install wget
```