import {
    Button,
    Center,
    FormControl,
    Input,
    Modal,
} from 'native-base';
import React, { useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';

const EventModal = ({ visible, data, onClose, onSave }) => {
    const [name, setName] = useState(data.name ? data.name : 'New Event');
    const [id, setId] = useState(data.id ? data.id : null);
    const [href, setHref] = useState(data.href ? data.href : null);
    const [date, setDate] = useState(data.date ? data.date : null);
    const [location, setLocation] = useState(data.location ? data.location : null);
    const [description, setDescription] = useState(data.description ? data.description : null);
    const [isPublic, setIsPublic] = useState(data.public ? data.public : 1);
    const [owner, setOwner] = useState(data.owner ? data.owner : null);
    const [artist, setArtist] = useState(data.artist ? data.artist : null);

    return (
        <Center flex={1}>
            <Modal isOpen={visible} onClose={onClose}>
                <Modal.Content maxWidth="400px">
                    <Modal.Header>Event({id}){isPublic ? 'Public' : 'Private'}</Modal.Header>
                    <Modal.Body>
                        <FormControl mt="3">
                            <FormControl.Label>Name</FormControl.Label>
                            <Input
                                value={name}
                                onChangeText={(text) => setName(text)}
                                variant="underlined"
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Artist</FormControl.Label>
                            <Input
                                value={artist}
                                onChangeText={(text) => setArtist(text)}
                                variant="underlined"
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Date</FormControl.Label>
                            <Input
                                value={date}
                                onChangeText={(text) => setDate(text)}
                                variant="underlined"
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Location</FormControl.Label>
                            <Input
                                value={location}
                                onChangeText={(text) => setLocation(text)}
                                variant="underlined"
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Description</FormControl.Label>
                            <Input
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                variant="underlined"
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Public</FormControl.Label>
                            <Input
                                value={isPublic}
                                onChangeText={(text) => setIsPublic(text)}
                                variant="underlined" isReadOnly={readOnly}
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Owner</FormControl.Label>
                            <Input
                                value={owner}
                                onChangeText={(text) => setOwner(text)}
                                variant="underlined" isReadOnly={readOnly}
                            />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button onPress={onClose}>Cancel</Button>
                            <Button onPress={() => onSave({ name, id, href, date, location, description, isPublic, owner, artist })}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    );
};

export default EventModal;
