import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor : '#CDCDE0',
        tabBarShowLabel: false, 
        tabBarStyle:{
            backgroundColor: '#fff',
            borderTopColor: '#F0F0F0',
            borderTopWidth: 1,
            height:70,
            paddingTop:8,
        }
    }}
    >
        <Tabs.Screen  name='index' options={{
            tabBarIcon : ({color , focused}) => <Ionicons name= {focused ? 'home' : 'home-outline'} size={26} color={color} />
            }}/>
        <Tabs.Screen  name='cart' options={{
            tabBarIcon : ({color , focused}) => <Feather name= {focused ? 'shopping-cart' : 'shopping-cart'} size={26} color={color} />
            }}/>
        <Tabs.Screen  name='favourites' options={{
            tabBarIcon : ({color , focused}) => <Ionicons name= {focused ? 'heart' : 'heart-outline'} size={26} color={color} />
            }}/>
        <Tabs.Screen  name='profile' options={{
            tabBarIcon : ({color , focused}) => <Ionicons name= {focused ? 'person' : 'person-outline'} size={26} color={color} />
            }}/>
    </Tabs>
  )
}