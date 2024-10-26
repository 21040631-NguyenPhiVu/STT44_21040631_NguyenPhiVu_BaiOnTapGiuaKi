import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Screen_01() {
    const [category, setCategory] = useState([]);
    const [location, setLocation] = useState([]);
    const recommendedLocations = [
        {
            id: '1',
            image: require('../assets/baiTH4/photo4.png'),
        },
        {
            id: '2',
            image: require('../assets/baiTH4/photo5.png'),
        },
    ]

    useEffect(() => {
        axios.get('https://671cefad09103098807bb03f.mockapi.io/category')
            .then((response) => {
                setCategory(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
        axios.get('https://671cf34609103098807bbc63.mockapi.io/location')
            .then((res) => {
                setLocation(res.data);
            });
    }, []);

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <View style={styles.categoryIconContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderLocationItem = ({ item }) => (
        <TouchableOpacity style={styles.locationItem}>
            <Image
                source={{ uri: item.image }}
                style={styles.locationImage}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.container}>
                <ScrollView style={{ width: '100%', height: 650, }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.container1}>
                            <Image source={require('../assets/baiTH4/logoicon.png')} style={styles.icon} />
                            <View style={styles.searchContainer}>
                                <TextInput placeholder="Search here..." style={styles.searchInput} />
                                <TouchableOpacity>
                                    <Image source={require('../assets/baiTH4/findicon.png')} style={styles.searchIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/baiTH4/personicon.png')} style={styles.icon} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.welcomeText}>Welcome!</Text>
                                    <Text style={styles.donnaText}>Donna stroupe</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Image source={require('../assets/baiTH4/ringicon.png')} style={styles.notificationIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.section}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Category</Text>
                            <TouchableOpacity>
                                <Image source={require('../assets/baiTH4/3gach.png')} style={{ width: 35, height: 35 }} />
                            </TouchableOpacity>
                        </View>
                        {category.length > 0 ? (
                            <FlatList
                                data={category}
                                renderItem={renderCategoryItem}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={4}
                                scrollEnabled={false}
                                columnWrapperStyle={styles.categoryRow}
                            />
                        ) : (
                            <Text>No categories available</Text>
                        )}
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.section}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Popular Destinations</Text>
                            <TouchableOpacity>
                                <Image source={require('../assets/baiTH4/3gach.png')} style={{ width: 35, height: 35 }} />
                            </TouchableOpacity>
                        </View>
                        {category.length > 0 ? (
                            <FlatList
                                data={location}
                                renderItem={renderLocationItem}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={3}
                                scrollEnabled={false}
                                columnWrapperStyle={styles.locationRow}
                            />
                        ) : (
                            <Text>No categories available</Text>
                        )}
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.section}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Recommended</Text>
                        </View>
                        <FlatList
                            data={recommendedLocations}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.recommendedItem}>
                                        <Image
                                            source={item.image}
                                            style={styles.recommendedLocations}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            scrollEnabled={false}
                            columnWrapperStyle={styles.locationRow}
                            style={{ marginBottom: 70 }}
                        />
                    </View>
                </ScrollView>

                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.footerItem}>
                        <Image source={require('../assets/baiTH4/homeicon.png')} style={styles.footerIcon} />
                        <Text style={styles.footerText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerItem}>
                        <Image source={require('../assets/baiTH4/exploreicon.png')} style={styles.footerIcon} />
                        <Text style={styles.footerText}>Explore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerItem}>
                        <Image source={require('../assets/baiTH4/searchicon.png')} style={styles.footerIcon} />
                        <Text style={styles.footerText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerItem}>
                        <Image source={require('../assets/baiTH4/profileicon.png')} style={styles.footerIcon} />
                        <Text style={styles.footerText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: '#5958b2',
        height: 170,
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: '50%',
    },
    searchContainer: {
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginLeft: 10,
        width: '80%',
    },
    searchInput: {
        height: 40,
        width: '80%',
        fontSize: 15,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    welcomeText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    donnaText: {
        color: '#fff',
        marginTop: 5,
        fontSize: 20,
    },
    notificationIcon: {
        width: 50,
        height: 50,
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryRow: {
        justifyContent: 'space-between',
        marginTop: 10,
    },
    categoryItem: {
        width: '23%',
        alignItems: 'center',
        marginTop: 10,
    },
    categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    categoryText: {
        fontSize: 17,
        textAlign: 'center',
        color: '#333333',
    },
    locationRow: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    locationItem: {
        width: '31%',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        marginTop: 10,
    },

    locationImage: {
        width: '100%',
        height: 100,
        borderRadius: 12,
    },
    recommendedItem: {
        width: '47%',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        marginTop: 10,
    },
    recommendedLocations: {
        width: '100%',
        height: 100,
        borderRadius: 12,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#5958b2',
        paddingVertical: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerItem: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 35,
        height: 35,
    },
    footerText: {
        color: '#fff',
        fontSize: 17,
    },
})