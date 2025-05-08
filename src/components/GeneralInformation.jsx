import { useState } from 'react';
import Input from './Input';
import Container from './Container';

export default function GeneralInformation() {
    return (
        <Container title="General information">
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <Input
                    title="Name"
                />
                <Input
                    title="Surname"
                />
                <Input
                    title="Email"
                />
                <Input
                    title="Phone"
                />
            </div>
        </Container>
    );
}