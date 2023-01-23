import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue, FormControl, FormLabel, Input, FormErrorMessage, SimpleGrid,
} from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';
import {useState} from "react";
import Film from "./Film";


export default function WyszuakjFilm() {

    function validateName(value) {
        let error
        if (!value) {
            error = 'Wypelnij pole'
        }
        return error
    }

    const [search, setSearch] = useState('');


    return (
        <Center py={6}>
            <FormControl isRequired>
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            setSearch(values.name);
                            actions.setSubmitting(false);
                        }, 1000)
                    }}
                >
                    {(props) => (
                        <Form>
                            <Field name='name' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel>Wyszukaj film po tytule</FormLabel>
                                        <Input {...field} placeholder='name' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                colorScheme='teal'
                                isLoading={props.isSubmitting}
                                type='submit'
                            >
                                Szukaj
                            </Button>
                        </Form>
                    )}
                </Formik>
            </FormControl>
            <SimpleGrid columns={3} spacing={20}>
            {search && <Film url={'http://localhost:8080/filmy/search/'+search}/>} </SimpleGrid>
        </Center>

    );
}
