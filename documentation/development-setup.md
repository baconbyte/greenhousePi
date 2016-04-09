Development Setup
=================

I run my Raspberry Pi in headless mode so to avoid having a command line editor this is the setup I use to develop locally and deploy to the pi.

Setup the Pi
------------
Install Node:

    wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
    sudo dpkg -i node_latest_armhf.deb   
    sudo reboot
Confirm installed

    node -v   
Forever will run a script and restart it if it finishes (crashes)

    sudo npm install forever -g   
Create a bare repo

    mkdir -p ~/greenhouse_app.git
    cd ~/greenhouse_app.git
    git init --bare   
Create Deploy directory

    mkdir -p ~/apps/greenhouse_app
Create the hook which will deploy the app

    cd ~/greenhouse_app.git/hooks
    vim post-receive
Our post-receive script:

    #!/bin/sh
    read oldrev newrev ref
    branchname=${ref#refs/heads/}
    DEPLOYDIR=~/apps/greenhouse_app
    GIT_WORK_TREE="$DEPLOYDIR" git checkout -f ${branchname}
    cd "$DEPLOYDIR"
    forever stop index.js
    npm install
    forever start index.js
    echo "Greenhouse App deployed"   
Ensure it can execute

    chmod +x post-receive  
    
Enable temperature sensors

    sudo vim  /boot/config.txt
    
Add the line

    dtoverlay=w1-gpio
    
Directory for photos

    sudo mkdir -p /greenhouse/photos
    sudo chmod 777 /greenhouse/photos
    
Enable camera
    
    sudo raspi-config
    
Setup Development Machine
-------------------------
    
ssh-copy id to avoid entering password
    
    ssh-copy-id pi@192.168.1.91  
    
Add alias to ssh into pi

    echo 'alias pi="ssh pi@192.168.1.91"' >> ~/.bash_profile
    
Navigate to cloned workspace

    git remote add pi pi@192.168.1.91:greenhouse_app.git
To Deploy the changes to pi
---------------------------

Commit changes locally and then push to pi

    git push pi <branch_name>
You should get a response like this

    Counting objects: 3, done.
    Delta compression using up to 8 threads.
    Compressing objects: 100% (3/3), done.
    Writing objects: 100% (3/3), 386 bytes | 0 bytes/s, done.
    Total 3 (delta 1), reused 0 (delta 0)
    remote: info:    Forever stopped process:
    remote:     uid  command             script   forever pid   id logfile                    uptime         
    remote: [0] kCsK /usr/local/bin/node index.js 24857   24869    /home/pi/.forever/kCsK.log 0:20:12:37.428 
    remote: npm WARN package.json GreenhousePi@1.0.0 No README data
    remote: warn:    --minUptime not set. Defaulting to: 1000ms
    remote: warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
    remote: info:    Forever processing file: index.js
    remote: Greenhouse App deployed ;)
    To pi@192.168.1.91:greenhouse_app.git

    
Other
=====

Install OS on pi card using mac
-------------------------------

https://www.raspberrypi.org/documentation/installation/installing-images/mac.md

Extend Root filesystem
----------------------

e.g. "df -h" shows /dev/root was 100% (3.6GB) when my partition is 32G size

https://www.raspberrypi.org/forums/viewtopic.php?f=51&t=45265