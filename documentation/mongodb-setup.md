MongoDB setup
=============

My Raspberry Pi has limited storage so I mount a usb drive to /usbdrv for the mongo data files

Mount Drive
-----------
On the pi:

    sudo mkdir /usbdrv
    
    sudo blkid
    
Check output an note usb drive info

    vi /etc/fstab
    
Append this line

    /dev/sda1        /usbdrv       vfat    uid=pi,gid=pi,umask=0022,sync,auto,nosuid,rw,nouser 0   0
    
Reboot pi

    sudo reboot

Install MongoDB
---------------
On the pi:

    sudo apt-get update
    sudo apt-get install mongodb
    sudo mkdir -p /usbdrv/db
    sudo chown mongodb:nogroup /usbdrv/db
    
Manually Start
--------------
    sudo mongod --dbpath /usbdrv/mongodb
    
Can edit /etc/mongo.conf to set default paths
    
