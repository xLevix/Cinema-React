import React, {useEffect, useState} from 'react';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import axios from "axios";
import authHeader from "../services/auth-header";
import { format } from 'date-fns'

export default function SubFilm(props) {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);

    const [seanse, setSeanse] = useState([]);
    const [choosenSeans, setChoosenSeans] = useState(null);
    const [seansInfo, setSeansInfo] = useState(null);

    // let takenSeats = [];
    const [seatsTaken, setSeatsTaken] = useState([]);
    const [clickedSeats, setClickedSeats] = useState([]);

    const loadSeanse = () =>{
        axios.get("http://localhost:8080/filmy/"+ props.id +"/seanse", { headers: authHeader() })
            .then(response => {
                response.data.map((seans) => {
                    console.log(response.data);
                    setSeanse(seanse => [...seanse, seans]);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    const loadSeansInfo = (id) => {
        axios.get("http://localhost:8080/seanse/"+id, { headers: authHeader() })
            .then(response => {
                console.log(response.data);
                setSeansInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const loadSeatsTaken = (id) => {
        axios.get("http://localhost:8080/seanse/"+id+"/rezerwacje", { headers: authHeader() })
            .then(response => {
                console.log(response.data);
                response.data.map((seat) => {
                    setSeatsTaken(seatsTaken => [...seatsTaken, seat.seatNumber]);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(() => {
        loadSeanse();

    }, []);


    const Form1 = () => {
        const [show, setShow] = React.useState(false);
        const handleClick = () => setShow(!show);
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Kup bilet
                </Heading>
                <Flex>
                    <FormControl mr="5%">
                        <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                            Imie
                        </FormLabel>
                        <Input id="first-name" placeholder="First name" />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                            Nazwisko
                        </FormLabel>
                        <Input id="last-name" placeholder="First name" />
                    </FormControl>
                </Flex>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                        htmlFor="country"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Seans
                    </FormLabel>
                    <Select
                        id="country"
                        name="country"
                        autoComplete="country"
                        placeholder="Select option"
                        focusBorderColor="brand.400"
                        onChange={(e) => {
                            setChoosenSeans(e.target.value);
                            loadSeansInfo(e.target.value);
                        }}
                        value={choosenSeans}
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md">
                        {seanse && (
                            seanse.map((seans) => (
                                <option key={seans.id} value={seans.id}>{format(new Date(seans.date), 'MMMM Do, yyyy H:mma')}</option>
                            ))
                        )}

                    </Select>
                </FormControl>
            </>
        );
    };

    function createSeats(numberOfSeats) {
        let seats = [];
        for (let i = 0; i < numberOfSeats; i++) {
            seats.push(
                <Button
                    key={i}
                    colorScheme="teal"
                    variant="outline"
                    size="md"
                    onClick={() => {
                        if (clickedSeats.includes(i)) {
                            setClickedSeats(clickedSeats.filter(item => item !== i));
                        } else {
                            setClickedSeats(clickedSeats => [...clickedSeats, i]);
                        }
                    }}
                >
                    {i}
                </Button>
            );
        }

        seatsTaken.map((seat) => {
            seats[seat] = <Button
                key={seat}
                colorScheme="red"
                variant="solid"
                size="md"
                disabled={true}
            >
                {seat}
            </Button>
        })

        clickedSeats.map((seat) => {
            seats[seat] = <Button
                key={seat}
                colorScheme="green"
                variant="solid"
                size="md"
            >
                {seat}
            </Button>
        })

        return seats;
    }

    const Form2 = () => {
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal">
                    Wybierz miejsce
                </Heading>
                <SimpleGrid columns={4} spacing={6}>

                        {seansInfo && (

                            loadSeatsTaken(choosenSeans),
                            createSeats(seansInfo.seats)
                        )}
                </SimpleGrid>
            </>
        );
    };



    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form">
                <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated></Progress>
                {step === 1 ? <Form1 /> : <Form2 />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 50);
                                }}
                                isDisabled={step === 1}
                                colorScheme="teal"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={step === 2}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 2) {
                                        setProgress(100);
                                    } else {
                                        setProgress(progress + 50);
                                    }
                                }}
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>
                        {step === 2 ? (
                            <Button
                                w="7rem"
                                colorScheme="red"
                                variant="solid"
                                onClick={() => {
                                    toast({
                                        title: 'Zakup udany.',
                                        description: "Dziekujemy :).",
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }}>
                                Submit
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}