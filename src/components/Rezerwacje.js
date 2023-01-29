import {
    Heading,
    Text,
    Stack,
    Image,
    Divider, CardFooter, Button, ButtonGroup, CardBody, Card, SimpleGrid,
} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import {format} from "date-fns";
import _ from "lodash";
import ReactPDF, { Page, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function Rezerwacje() {

    const currentUser = AuthService.getCurrentUser();
    const [rezerwacje, setRezerwacje] = useState([]);

    const loadRezerwacje = () => {
        axios.get("http://localhost:8080/rezerwacje/user/"+ currentUser.id, { headers: authHeader() })
            .then(response => {
                response.data.map((rezerwacja) => {
                    setRezerwacje(rezerwacje => [...rezerwacje, rezerwacja]);
                })
            })
            .catch(error => {
                console.log(error);
            });
    };


    useEffect(() => {
        loadRezerwacje();
    }, []);

    var takenSeats = "";
    const grouped = _.groupBy(rezerwacje, rezerwacja => rezerwacja.idScreening.id);

    const pdfStyles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={pdfStyles.page}>
                <View style={pdfStyles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={pdfStyles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <Stack spacing={4} align={"center"}>
            <Heading fontSize={"4xl"}>Twoje rezerwacje</Heading>
            <Divider />
            <SimpleGrid columns={4}>
                {grouped && Object.keys(grouped).map((key) => {
                    return (
                        takenSeats = "",
                        Object.keys(grouped[key]).map((key2) => {
                            takenSeats += grouped[key][key2].seatNumber+ ", ";
                        }),
                            <Card maxW='sm'>
                                <CardBody>
                                    <Image
                                        src={grouped[key][0].idScreening.idMovie.image}
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{grouped[key][0].idScreening.idMovie.name}</Heading>
                                        <Text>
                                            Data: {format(new Date(grouped[key][0].idScreening.date), 'dd.MM.yyyy  HH:mm')} <br/>
                                            Wybrane miejsca: {takenSeats}
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            Łączna cena: {grouped[key][0].idScreening.price * (takenSeats.split(',').length-1)} zł
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='blue'
                                        >
                                            Zaplac
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                    )
                })}
            </SimpleGrid>
        </Stack>
    );
}
