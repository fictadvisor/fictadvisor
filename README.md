## Overview
A monorepository that provides FICE Advisor API and Frontend services.

## Architecture
FICE Advisor is app that uses client-server architecture pattern.
Diagram is provided below.
![Screenshot_2](https://github.com/user-attachments/assets/15ff0c1a-06c7-475d-8466-6f6c6580aecf)

## Apps and Packages

- `fictadvisor-api`: a [NestJS](https://nestjs.com/) app that provides an API service
- `fictadvisor-web`: a [Next.js](https://nextjs.org/) app that provides a Frontend service
- `utils`: shared lib for frontend and backend services

## Getting started

To get a local copy up and running follow these steps.

### Prerequisites

* Installed yarn package on your machine

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/fictadvisor/fictadvisor.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```

## Usage

To build backend:
```sh
turbo build --filter api
```

To build frontend:
```sh
turbo build --filter @fictadvisor/frontend
```

To start the application for development environment:
```sh
# provided command will run only backend service
turbo start:dev

# this one will start only frontend service
turbo dev
```

## Roadmap

See the [open issues](https://github.com/fictadvisor/fictadvisor-api/issues) for a list of proposed features (and known issues).
Also you can check out [design document](https://docs.google.com/document/d/1Wdjv38hjq8VsVJsoJTa1jKZnF1H-4jEr/edit?usp=sharing&ouid=106875465955999672293&rtpof=true&sd=true) for better understanding of architecture and functionality of our back-end service.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/   amazing-feature`)
3. Commit your changes (`git commit -m 'Added an amazing   feature'`)
4. Push the branch (`git push -u origin feature/amazing-feature`)
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contacts

Feedback - [https://t.me/fict_robot](https://t.me/fict_robot)  
Project - [https://github.com/fictadvisor](https://github.com/fictadvisor)
