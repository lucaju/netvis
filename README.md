# NetVis

## Academic Research Network Visualization

A tool to visualize networked data, focus on the relationship between faculty members, departments, and research topics.
Developed in Javascript, PHP and MySQL, with AngularJS and [D3](https://d3js.org/).

## Features

### Dataset

The “Tags” menu displays the dataset in three categories: Researchers, Interests, and Departments. It is possible to search data by name. The visualization is populated as the user select and deselect tags. The nodes represent tags (Researchers, Departments, and Interests), and the lines the connection between them. More detailed description and functionalities are available in the ‘Help’ section of the visualization.

### Add / Import Data

Data can be added and edited manually by clicking on the “+” button.
It is also possible to import a dataset in two formats (JSON or CSV).

#### JSON

Schema:

    [   
        {
            "name": "String: required",
            "type": "String: required ['Researcher' | 'Department' | 'Interest']",
            "firstName": "String: optional",
            "lastName": "String: optional",
            "website": "String: optional",
            "edges": Array: optional
                [
                    {
                        "type": "String: required",
                        "name": "String: required"
                    }
                ]
        }
    ]

#### CSV

**Nodes only schema:**

    name,type,firstName,lastName,website

- Only “name” and “type” are required. All the other fields can be
   empty.
- The type should be one of the following: 'Researcher' | 'Department' | 'Interest

**Edges only schema:**

    source,target,sourceType,targetType

- All fields required. ‘source’ and ‘target’ correspond to the name of a node.
- The ‘sourceType’ and ‘targetType’ should be one of the following: 'Researcher' | 'Department' | ‘Interest. ]
- Nodes will be automatically created using the ‘source’ and ‘target’ fields.

### Export

Export the data or graphic from the on-screen visualization.  

#### Data

CSV and JSON: Both options contain the nodes (researchers, interests, and departments) and their relationship to other nodes.

#### Graph

**PNG**
The PNG option generates a raster file with transparent background. All the nodes and links currently present in the visualization.

**SVG**
The SVG option generates a vector-based file that can be opened in the browser or in any vector-based image editor.

### Layout

The layout menu in the side panel provides additional customization options, which includes:  

- Network and cluster view;   Adjusting how nodes react to each other
   through gravity, charge, distance, and collision detection;
- Changing the weight, size, and color of nodes (color coding can be
   applied by type of tags or by community;
- the latter is calculated by an algorithm that finds similar clusters based on the number of shared connections);
- Changing title and network link size and color.

## Install

1. Check the server requirements
2. Setup a database
3. Upload the files
4. Setup the app

### Server

This app requires a web server with:
**PHP 7.0 (or higher)**
**MySQL**

### Database

On your web host server, create a database for this app and define a user (and password) for this database.  

### Upload the files

Copy the files in the “dist” folder of this repository to a folder on the server.

### Setup

On the browser, navigate to the folder you put the files. *e.g.*, www.your-server-url.com/netvis/index.php
The app will guide you through a step-by-step installation on the first time you run it. Follow the instructions.

#### Email provider - SendGrid

Though this is not required for the app to work, it is highly recommend.
This app uses SendGrid to send invite for new users and password resets.
SendGrid is free for up to 100 emails per day. Create an account and user your API during the installation process to hook the service. You wan also setup this later, on the settings panel.

## For Development

If you want to modify the code, customize, or develop further.
Assuming you are installing on a local machine.

1. Check the server requirements
2. Setup a database
3. Clone this repository and install the dependencies
4. Setup the app
5. Run

### Dev Server

This app requires a web server with:
**PHP 7.0 (or higher)**
**MySQL**

If you are on a Mac I suggest MAMP

The development environment requires:
**NodeJS** - Download here: [https://nodejs.org/en/](https://nodejs.org/en/)
**NPM** (Comes with NodeJS)

### Dev Database

On your web host server, create a database for this app and define a user (and password) for this database.

### Install dependencies

Clone this repository
Install dependencies `npm install`

### Development

Use the following to develop each module of this project
`npm run watch` [main app]
`npm run watchReset` [invite/reset email]
`npm run watchInstall` [install process]

The app will be accessible through your localhost in the ‘public’ folder of this project.

### Production

Use the following to compile files for production:
`npm run production` [main app]
`npm run productionReset` [invite/reset email]
`npm run productionInstall` [install process]

The files will be available in the ‘dist’ folder of this project.
