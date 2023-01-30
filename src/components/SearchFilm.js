import {
    Center,
    Button, FormControl, FormLabel, Input, FormErrorMessage, SimpleGrid,
} from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';
import Film from "./Film";

export default function WyszuakjFilm() {

    function validateName(value) {
        let error
        if (!value) {
            error = 'Wypelnij pole'
        }
        return error
    }

    return (
        <Center py={6}>
            <FormControl isRequired>
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            localStorage.setItem('search', values.name);
                            actions.setSubmitting(false);
                            window.location.reload();
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
                <SimpleGrid columns={3} spacing={20}>
                    {localStorage.getItem('search') && <Film url={'https://kino-spring.herokuapp.com/filmy/search/'+localStorage.getItem('search')}/>}
                </SimpleGrid>
            </FormControl>
        </Center>
    );
}
