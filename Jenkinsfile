
pipeline {
     agent any
        stages{
            stage("Build") {
                steps {
                    sh "source ~/.bashrc"
                    sh "npm install"
                    sh "npm build"
                    sh "npm export"
                    sh "sudo rm -rf /var/www/html/app"
                    sh "sudo mkdir /var/www/html/app"
                    sh "sudo cp -r ${WORKSPACE}/out /var/www/html/app"
                }
            }
        }
    }