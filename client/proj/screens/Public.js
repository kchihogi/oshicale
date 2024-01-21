import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    Agenda,
    AgendaEntry,
    AgendaSchedule,
    DateData,
} from 'react-native-calendars';

import { useFocusEffect } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import SharedApi from '../SharedApi';
const OpenapiJsClient = require('openapi-js-client');

function Public() {
    const [errorMessage, setErrorMessage] = useState("");
    const [agendaItems, setAgendaItems] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const sharedApi = SharedApi.getInstance();

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const last_year = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10); // YYYY-MM-DD
    const next_year = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10); // YYYY-MM-DD

    useFocusEffect(
        React.useCallback(() => {
            setErrorMessage("");
            setAgendaItems({});
            setMarkedDates({});
        }, [])
    );

    const format = (date) => {
        // "2024-01-21T07:40:51.293Z" to "2024-01-21"
        return date.toISOString().slice(0, 10);
    };

    const loadAgendaItemsForMonth = (date) => {
        console.log("loadAgendaItemsForMonth:", date);

        var api = new OpenapiJsClient.EventsApi(sharedApi.getDefaultClient());
        var callback = function(error, data, response) {
            if (error) {
                setErrorMessage('Get events failed: ' + error.message + ' \nResponse status: ' + response.status);
            } else {
                setAgendaItems({});
                let agendaItems = {};
                let markedDates = {};

                for (var i = 0; i < data.results.length; i++) {
                    markedDates[format(data.results[i].date)] = {marked: true};
                }

                for (var i = 0; i < data.results.length; i++) {
                    if (agendaItems[format(data.results[i].date)] == null) {
                        agendaItems[format(data.results[i].date)] = [];
                    }
                    agendaItems[format(data.results[i].date)].push({
                        name: data.results[i].name,
                        id: data.results[i].id,
                        href: data.results[i].href,
                        date: data.results[i].date,
                        location: data.results[i].location,
                        description: data.results[i].description,
                        public: data.results[i].public,
                        owner: data.results[i].owner,
                        artist: data.results[i].artist,
                        height: 80,
                    });
                }

                // add empty items for days not in the month
                const numDays = new Date(date.year, date.month, 0).getDate();
                const month = date.month < 10 ? '0' + date.month : date.month;
                for (let i = 1; i <= numDays; i++) {
                    const day = i < 10 ? '0' + i : i;
                    const dateString = `${date.year}-${month}-${day}`;
                    if (!agendaItems[dateString]) {
                        agendaItems[dateString] = [];
                    }
                }

                setAgendaItems(agendaItems);
                setMarkedDates(markedDates);
                setErrorMessage("");
            }
        };
        api.eventsList(null, callback);
    };

    const toggleCalendar = async (calendarOpened) => {
      console.log('calendarOpened: ' + calendarOpened);
    };

    const pressDay = async (day) => {
        console.log('pressDay: ' + day);
    };

    const changeDay = async (day) => {
        console.log('changeDay: ' + day);
    };

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
          <TouchableOpacity
            style={[styles.item, {height: reservation.height}]}
            onPress={() => Alert.alert(reservation.name)}
          >
            <Text style={{fontSize, color}}>{reservation.name}</Text>
          </TouchableOpacity>
        );
    };

    const renderEmptyDate = (date) => {
        const dateString = format(date);
        return (
            <TouchableOpacity
                style={styles.emptyDate}
                onPress={() => Alert.alert('Empty Date: ' + dateString)}
            >
                <Text>This is empty date!</Text>
            </TouchableOpacity>
        );
    };

    const rowHasChanged = (r1, r2) => {
      return r1.name !== r2.name;
    };

    // const refresh = async () => {
    //     console.log('refresh');
    // };

    return (
        <View style={styles.container}>
            <SafeAreaView/>
            <Text>{errorMessage}</Text>
            <Agenda
                items={agendaItems}
                loadItemsForMonth={loadAgendaItemsForMonth}
                onCalendarToggled={toggleCalendar}
                onDayPress={pressDay}
                onDayChange={changeDay}
                selected={today}
                minDate={last_year}
                maxDate={next_year}
                pastScrollRange={50}
                futureScrollRange={50}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                hideKnob={false}
                showClosingKnob={true}
                markedDates={markedDates}
                // onRefresh={refresh}
                // refreshing={false}
                style={{}}
                />
        </View>
    );
}

export default () => {
    return (
      <NativeBaseProvider>
          <Public />
      </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    }
});
