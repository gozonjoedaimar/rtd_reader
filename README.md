# devdocs

## Dependencies

### Install sphinx

    apt-get install python3-sphinx

### Install python3 and pip3

    # Check for python3 & pip3 installation
    python3 --version
    pip3 --version
    # Install pip3 if it's not installed
    sudo apt install python3-pip

### Install rtd theme for sphinx

    pip3 install sphinx_rtd_theme

## Run the docs

### Copy .env file

    cp .env.sample .env

### Install dependencies

    npm install
    npm run build
    npm run build-doc

### Start docs

    # dev
    npm run start-dev
    # prod
    npm start

## Open the docs in your browser

    http://localhost:3030

## Run app as a service

Update rtd_reader.service and replace /path/to/* with the actual path from your server
and copy unit file to /etc/systemd/system

    sudo cp ./rtd_reader.service /etc/systemd/system/

Reload systemd manager configuration.

    sudo systemctl daemon-reload

Start the service using the systemctl command.

    sudo systemctl start rtd_reader

Check the status of your service using the systemctl command.

    sudo systemctl status rtd_reader

Enable your service to start at boot time.

    sudo systemctl enable rtd_reader
