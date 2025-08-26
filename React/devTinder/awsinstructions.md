## frontend

 - Signup to AWS
 - Search EC2 - Elastic Cloud Compute
 - Enter the name, select OS (Ubuntu), download .pem file
 - Launch instance
 - Connect to instance
 - SSH Client
 - chmod 400 "devTinder-secret.pem" //modify the .pem file's permission - run the command
 - to login into the system - 
    ssh -i "devTinder-secret.pem" ubuntu@ec2-13-62-76-243.eu-north-1.compute.amazonaws.com
 - Install Node if not present - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
 - nvm install 22
 - Clone the project