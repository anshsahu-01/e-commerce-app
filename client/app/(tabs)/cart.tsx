import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import CartItems from '@/components/CartItems'

export default function Cart() {


  const {cartItems, cartTotal, removeFromCart, updateQuantity} = useCart()
  const router = useRouter()

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Cart' showBack/>

      {
        cartItems.length > 0 ? (
          <>
          <ScrollView className='flex-1 px-4 mt-4' showsVerticalScrollIndicator={false}>
            {cartItems.map((item, index)=>(
              <CartItems key={index} item={item} 
              onRemove={()=>removeFromCart(item.id, item.size)}
              onUpdateQuantity={(q)=>updateQuantity(item.id, q, item.size)}/>
            ))}
          </ScrollView>
          </>
        ) : (
          <View className='flex-1 items-center justify-center'>
            <Text className='text-3xl text-secondary'>Cart Is Empty</Text>
            <TouchableOpacity className='mt-4 bg-primary px-6 py-3 rounded-full' onPress={()=>router.push('/')}> 
              <Text className='text-white font-bold text-xl'>Shop Now !!</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </SafeAreaView>
  )
}