import { View, Text } from 'react-native'
import React from 'react'
import { useWishlist } from '@/context/WishlistContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import ProductCard from '@/components/ProductCard'

export default function Favourites() {

  const {wishlist} = useWishlist()
  const router = useRouter()

  return (
    <SafeAreaView className='flex-1'>
      <Header title='Wishlist' showCart showMenu/>

      {
      wishlist.length > 0 ? (
        <ScrollView className='flex-1 px-4 mt-4' showsVerticalScrollIndicator={false}>
          <View className='flex-row justify-between flex-wrap'>
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-lg text-secondary'>Your wishlist is empty</Text>
          <TouchableOpacity 
          className='mt-4 bg-primary px-6 py-3 rounded-full' 
          onPress={()=>router.push('/')}> 
            <Text className='text-white font-bold text-xl'>Shop Now !!</Text>
          </TouchableOpacity>
          </View>
      )}
    </SafeAreaView>
  )
}