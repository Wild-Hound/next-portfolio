
pipeline {
     agent any
     tools {nodejs "NODEJS"}
        stages{
            stage("Build") {
                steps {
                    sh "npm install"
                    sh "npm run build"
                    sh "npm run export"
                    sh "sudo rm -rf /var/www/html/app"
                    sh "sudo mkdir /var/www/html/app"
                    sh "sudo cp -r ${WORKSPACE}/out /var/www/html/app"
                }
            }
        }
    }