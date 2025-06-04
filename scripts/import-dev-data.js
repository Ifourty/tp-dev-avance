import { readFileSync } from 'fs';
import mongoose from "mongoose";
import { Tour } from '../models/tour.model.js';
import { config } from 'dotenv';

async function connectToMongoDB(callback) {
    config();
    const uri = process.env.MONGOURI;
    mongoose.connect(uri).then(() => {
        callback();
    })
}
connectToMongoDB(() => {
    console.log('Connected to MongoDB');
});

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tours = JSON.parse(readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        for (let i = 0; i < tours.length; i++) {
            await new Tour(tours[i]).save()
                .then(() => {
                    console.log(`Tour ${tours[i].name} saved successfully`);
                })
                .catch((err) => {
                    console.error(`Error saving tour ${tours[i].name}:`, err);
                });
        }
        console.log('Data successfully imported!');
    } catch (err) {
        console.error('Error importing data:', err);
    } finally {
        mongoose.connection.close();
    }
};

const deleteData = async () => {
    try {
        await mongoose.connection.collection('tours').deleteMany({});
        console.log('Data successfully deleted!');
    } catch (err) {
        console.error('Error deleting data:', err);
    } finally {
        mongoose.connection.close();
    }
};

const args = process.argv.slice(2);
if (args.includes('--import')) {
    importData();
} else if (args.includes('--delete')) {
    deleteData();
    console.log('Data successfully deleted!');
} else {
    console.log('Please specify --import or --delete');
    mongoose.connection.close();
}

