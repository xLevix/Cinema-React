import {
    Card,
    CardBody,
    CardFooter,
    Text,
    Stack,
    Image,
    Divider,
    Heading,
    ButtonGroup,
    Button,
    SimpleGrid,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import SubFilm from "./SubFilm";

export default function Film(props) {
    const [films, setFilms] = useState([]);
    const [setLoading] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [choosenFilm, setChoosenFilm] = useState("");

    useEffect(() => {
        axios.get(props.url, { headers: authHeader() })
            .then(response => {
                setFilms(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

        return(
            <div style={{display: 'flex',}}>
                <SimpleGrid columns={3} spacing='400px' justifyItems={"end"}>
                    {films.map((film) => (
                        <Card key={film.id} maxW="md" borderWidth="1px" borderRadius="lg" width={450} >
                            <Divider />
                            <CardBody>
                                <Image
                                    src={film.image}
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='8'>
                                    <Heading size='md'>{film.name}</Heading>
                                    <Text>
                                        {film.description}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    <Button variant='solid' colorScheme='blue' onClick={()=> {
                                        setChoosenFilm(film.id);
                                        onOpen();
                                    }}>
                                        Buy ticket
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    ))}
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Formularz</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={10}>
                                <SubFilm id={choosenFilm} />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </SimpleGrid>
            </div>
        )
}