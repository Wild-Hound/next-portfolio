
pipeline {
     agent any
     tools {nodejs "16.17.0"}
        stages{
            stage("Build") {
                steps {
                    sh "npm install"
                    sh "npm run build"
                    sh "npm run export"
                    sh "sudo rm -r /var/www/html/app"
                    sh "sudo mkdir /var/www/html/app"
                    sh "sudo cp -r ${WORKSPACE}/out /var/www/html/app"
                }
            }
        }
    }