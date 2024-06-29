#chmod +x ubuntuCommand.sh
#./ubuntuCommand.sh
# Update paket dan sistem
sudo apt-get update

npm install express --save-dev

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Install package sebagai dev dependency
npm install nodemon --save-dev
npm install pg --save-dev

# Install sequelize-cli secara global
npm install sequelize-cli -g --save-dev

# Install package sebagai dev dependency
npm install sequelize --save-dev

npm init -y

npm install sequelize

sequelize init


npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
npx sequelize-cli model:generate --name Item --attributes name:string,price:decimal,description:string,userId:integer
npx sequelize-cli model:generate --name Order --attributes userId:integer,itemId:integer,quantity:integer

