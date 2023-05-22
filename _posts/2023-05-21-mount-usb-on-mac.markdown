---
layout: post
title:  "TIL: How to manually mount an external drive on MacOS?"
date:   2023-05-21 18:07:22 -0700
categories: linux
---
After some update of the Operative System, my Mac will not mount any external drive (SD card, hard drive, micro-controller) automatically when I connect it to the USB port. I can see the device connected to the computer, but the device is not mounted, and the drive cannot be read nor you can write any file.

This is how I manually mount an external drive every time I need to use it.

1. Once the device is connected, list the local disks and volumes:

{% highlight shell %}
diskutil list
{% endhighlight %}

2. Create a directory where the device will be mounted:

{% highlight shell %}
sudo mkdir /Volumes/media
{% endhighlight %}

3. Mount the device; replace `/dev/disk4s1` with the path of the disk you are trying to mount:

{% highlight shell %}
sudo mount -w -t msdos /dev/disk4s1 /Volumes/media
{% endhighlight %}