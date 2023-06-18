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
