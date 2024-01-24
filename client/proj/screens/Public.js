import React, { useState, useEffect } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    Agenda
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

    const format = (date) => {
        // "2024-01-21T07:40:51.293Z" to "2024-01-21"
        return date.toISOString().slice(0, 10);
    };

    const fetch_interval_in_days = 28;
    const [requestOptions, setRequestOptions] = useState({});

    const today = format(new Date());
    const last_year = format(new Date(new Date().setFullYear(new Date().getFullYear() - 1))); // YYYY-MM-DD
    const next_year = format(new Date(new Date().setFullYear(new Date().getFullYear() + 1))); // YYYY-MM-DD

    useEffect(() => {
        let from = new Date(today);
        from.setDate(from.getDate() - (fetch_interval_in_days/3));
        let to = new Date(today);
        to.setDate(to.getDate() + fetch_interval_in_days);
        let opts = {
            'from': format(from),
            '_public': null,
            'to': format(to)
        };
        setRequestOptions(opts);
    }, []);

    useEffect(() => {
        if (Object.keys(requestOptions).length > 0) {
            fetch(requestOptions).then(() => {
            }).catch((error) => {
                console.log("Error in fetch:", error + " requestOptions:" + requestOptions);
            });
        }
    }, [requestOptions]);

    useFocusEffect(
        React.useCallback(() => {
            setErrorMessage("");
        }, [])
    );

    const parse = (date) => {
        // "2024-01-21" to "2024-01-21T07:40:51.293Z"
        return new Date(date + 'T00:00:00.000Z');
    }

    const sortAgendaItems = (agendaItems) => {
        // sort agendaItems by date
        const sortedAgendaItems = {};
        Object.keys(agendaItems).sort().forEach(function(key) {
            sortedAgendaItems[key] = agendaItems[key];
        });
        return sortedAgendaItems;
    }

    const mergeAgendaItem = (agendaItems, date, item) => {
        // merge item into agendaItems[date]
        if (agendaItems[date] == null) {
            agendaItems[date] = [];
        }
        if (item == null) {
            agendaItems[date] = [];
            return agendaItems;
        }
        let found = false;
        for (var i = 0; i < agendaItems[date].length; i++) {
            if (agendaItems[date][i].id == item.id) {
                agendaItems[date][i] = item;
                found = true;
                break;
            }
        }
        if (!found) {
            agendaItems[date].push(item);
        }
        return agendaItems;
    }

    const fillEmptyDays = (agendaItems, from, to) => {
        let length = Object.keys(agendaItems).length;
        for (var i = 0; i < length; i++) {
            var date = new Date(Object.keys(agendaItems)[i]);
            var nextDate = Object.keys(agendaItems)[i+1] ? new Date(Object.keys(agendaItems)[i+1]) : null;
            var diff = nextDate ? (nextDate - date) / (1000 * 60 * 60 * 24) : null;
            if (diff > 1) {
                for (var j = 1; j < diff; j++) {
                    var emptyDate = new Date(date);
                    emptyDate.setDate(emptyDate.getDate() + j);
                    agendaItems = mergeAgendaItem(agendaItems, format(emptyDate), null);
                }
            }
        }
        var date = new Date(Object.keys(agendaItems)[length-1]);
        to = new Date(to);
        var diff = (to - date) / (1000 * 60 * 60 * 24);
        if (diff > 0) {
            for (var j = 1; j <= diff; j++) {
                var emptyDate = new Date(date);
                emptyDate.setDate(emptyDate.getDate() + j);
                agendaItems = mergeAgendaItem(agendaItems, format(emptyDate), null);
            }
        }
        var date = new Date(Object.keys(agendaItems)[0]);
        from = new Date(from);
        var diff = (date - from) / (1000 * 60 * 60 * 24);
        if (diff > 0) {
            for (var j = 1; j <= diff; j++) {
                var emptyDate = new Date(date);
                emptyDate.setDate(emptyDate.getDate() - j);
                agendaItems = mergeAgendaItem(agendaItems, format(emptyDate), null);
            }
        }
        return agendaItems;
    }

    const trimAgendaItems = (agendaItems, from, to) => {
        from = new Date(from);
        to = new Date(to);
        let length = Object.keys(agendaItems).length;
        for (var i = 0; i < length; i++) {
            var date = new Date(Object.keys(agendaItems)[i]);
            if (date < from || date > to) {
                delete agendaItems[Object.keys(agendaItems)[i]];
            }
        }
        return agendaItems;
    }

    const fetch = async (requestOptions) => {
        var api = new OpenapiJsClient.EventsApi(sharedApi.getDefaultClient());
        var callback = function(error, data, response) {
            if (error) {
                setErrorMessage('Get events failed: ' + error.message + ' \nResponse status: ' + response.status);
            } else {
                let tmpAgendaItems = agendaItems;
                let markedDates = {};

                for (var i = 0; i < data.results.length; i++) {
                    markedDates[format(data.results[i].date)] = {marked: true};
                }

                for (var i = 0; i < data.results.length; i++) {
                    tmpAgendaItems = mergeAgendaItem(tmpAgendaItems, format(data.results[i].date), {
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

                tmpAgendaItems = sortAgendaItems(tmpAgendaItems);
                if (requestOptions.from != null && requestOptions.to != null) {
                    tmpAgendaItems = fillEmptyDays(tmpAgendaItems, requestOptions.from, requestOptions.to);
                    trimmed_from = new Date(requestOptions.from);
                    trimmed_from.setDate(trimmed_from.getDate() - (fetch_interval_in_days*2));
                    trimmed_to = new Date(requestOptions.to);
                    trimmed_to.setDate(trimmed_to.getDate() + (fetch_interval_in_days*2));
                    tmpAgendaItems = trimAgendaItems(tmpAgendaItems, trimmed_from, trimmed_to);
                }

                setAgendaItems(tmpAgendaItems);
                setMarkedDates(markedDates);

                if (data.next != null) {
                    var queryString = data.next.split("?")[1];
                    var parametersArray = queryString.split("&");
                    var parameters = {};
                    parametersArray.forEach(function(param) {
                        var keyValue = param.split("=");
                        var key = keyValue[0];
                        var value = keyValue[1];
                        parameters[key] = value;
                    });
                    let opts = {
                        'from': parameters['from'] === undefined ? null : parameters['from'],
                        "name": parameters['name'] === undefined ? null : parameters['name'],
                        "owner": parameters['owner'] === undefined ? null : parameters['owner'],
                        "page": parameters['page'] === undefined ? null : parameters['page'],
                        '_public': parameters['public'] === undefined ? null : parameters['public'],
                        'to': parameters['to'] === undefined ? null : parameters['to']
                    };
                    setRequestOptions(opts);
                }
            }
        }
        api.eventsList(requestOptions, callback);
    };

    const loadAgendaItemsForMonth = (date) => {
        console.log("loadAgendaItemsForMonth:", date);
    };

    const toggleCalendar = async (calendarOpened) => {
      console.log('calendarOpened: ' + calendarOpened);
    };

    const pressDay = (day) => {
        let from = new Date(day.dateString);
        from.setDate(from.getDate() - (fetch_interval_in_days/3));
        let to = new Date(day.dateString);
        to.setDate(to.getDate() + fetch_interval_in_days);
        let opts = {
            'from': format(from),
            '_public': null,
            'to': format(to)
        };
        setRequestOptions(opts);
    };

    const changeDay = (day) => {
        // only on Sunday
        let dayOfWeek = new Date(day.dateString).getDay();
        if (dayOfWeek != 0) {
            return;
        }
        let from = new Date(day.dateString);
        from.setDate(from.getDate() - (fetch_interval_in_days/3));
        let to = new Date(day.dateString);
        to.setDate(to.getDate() + fetch_interval_in_days);
        let opts = {
            'from': format(from),
            '_public': null,
            'to': format(to)
        };
        setRequestOptions(opts);
    };

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        const alertMessage = reservation.name+"\n"+reservation.description;

        return (
          <TouchableOpacity
            style={[styles.item, {height: reservation.height}]}
            onPress={() => Alert.alert(alertMessage)}
          >
            <Text style={{fontSize, color}}>{reservation.name}</Text>
            <Text style={{fontSize, color}}>{reservation.location}</Text>
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

    const refresh = async () => {
        console.log('refresh');
    };

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
                onRefresh={refresh}
                refreshing={false}
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
