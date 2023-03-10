import Head from 'next/head';
import { Dashboard } from '../../components/templates';

export default function UserPage() {
    return (
        <>
            <Head>
                <title>Smapp | Smart Meal Plan App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Dashboard />
        </>
    );
}