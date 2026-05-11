import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'expo-router'
import { Address } from '@/constants/types'
import { dummyAddress } from '@/assets/assets'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '@/constants'
import Header from '@/components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

export default function checkout() {

    const {cartTotal} = useCart()
    const router = useRouter()
    const tax = cartTotal * 0.1;
    const shipping = cartTotal > 100 ? 0 : 10;
    const total = cartTotal + tax + shipping;

    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)

    const [selectedAdress, setSelectedAdress] = useState<Address | null>(null)
    const [paymentMethod, setPaymentMethod] = useState< "cash" | "stripe">('cash')

    const fetchAdresses = async () => {
        const addrList = dummyAddress;
        if(addrList.length > 0){
            const def = addrList.find((a: any)=> a.isDefault) || addrList[0];
            setSelectedAdress(def as Address)
        }
        setPageLoading(false)
    }

    const handlePlaceOrder = async () =>{
        if(!selectedAdress){
            Toast.show({
                type:'error',
                text1:'No Address Selected',
                text2:'Please select a delivery address to place your order.'
            })
            return;
        }
        if(paymentMethod === 'stripe')
            return Toast.show({
                type:'error',
                text1:'Payment Method Not Supported',
                text2:'Currently only Cash on Delivery is supported. Please select Cash on Delivery to place your order.'
            })

        // Cash on Dilevery

        router.replace('/orders')
    }

    useEffect(() => {
        fetchAdresses()
    }, [])
    
    if(pageLoading){
        return(
            <SafeAreaView className='flex-1 bg-surface justify-center items-center'>
                <ActivityIndicator size={'large'} color={COLORS.primary}/>
            </SafeAreaView>
        )
    }

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
        <Header title='Checkout' showBack />

        <ScrollView className='flex-1 px-4 mt-4'>
            {/* Adress Section */}
            <Text className='text-lg font-bold text-primary mb-4'>Shipping Adress</Text>
            {
                selectedAdress ? (
                    <View className='bg-white p-4 rounded-xl mb-6 shadow-sm'>
                        <View className='flex-row items-center justify-between mb-2'>
                            <Text className='text-base font-bold'>{selectedAdress.type}</Text>
                            <TouchableOpacity onPress={()=>router.push('/addresses')}>
                                <Text className='text-accent text-sm'>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>
                            {selectedAdress.street},{selectedAdress.city}
                            {"\n"}
                            {selectedAdress.state} - {selectedAdress.zipCode}
                            {"\n"}
                            {selectedAdress.country}
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity 
                    onPress={()=> router.push('/addresses')}
                    className='bg-white p-6 mb-6 rounded-xl items-center justify-center border-2 border-dashed border-gray-100'
                    >
                        <Text className='text-primary font-bold'>Add Address</Text>
                    </TouchableOpacity>
                )
            }

            {/* Payment Section */}
            <Text className='text-lg font-bold text-primary mb-4'>Payment Method</Text>

            {/* Cash on dilevery Option */}

            <TouchableOpacity 
            onPress={()=>setPaymentMethod('cash')}
            className={`bg-white p-4 rounded-xl mb-4 shadow-lg flex-row items-center border-2 ${paymentMethod === 'cash' ? 'border-primary' : 'border-transparent'}`}>
                <Ionicons name='cash-outline' size={24} color={COLORS.primary} className='mr-3'/>
                <View className='flex-1'>
                    <Text className='ext-base font-bold text-primary'>Cash on Dilevery</Text>
                    <Text className='text-secondary text-sm mt-1'>Pay when you recieve the order</Text>
                </View>
                {paymentMethod === 'cash' && <Ionicons name='checkmark-circle' size={20} color={COLORS.primary}/>}
            </TouchableOpacity>

            {/* Stripe Option */}

            <TouchableOpacity 
            onPress={()=>setPaymentMethod('stripe')}
            className={`bg-white p-4 rounded-xl mb-4 shadow-lg flex-row items-center border-2 ${paymentMethod === 'stripe' ? 'border-primary' : 'border-transparent'}`}>
                <Ionicons name='card-outline' size={24} color={COLORS.primary} className='mr-3'/>
                <View className='flex-1'>
                    <Text className='ext-base font-bold text-primary'>Pay with Card</Text>
                    <Text className='text-secondary text-sm mt-1'>Credit or Debit Card</Text>
                </View>
                {paymentMethod === 'stripe' && <Ionicons name='checkmark-circle' size={20} color={COLORS.primary}/>}
            </TouchableOpacity>

        </ScrollView>

        {/* Order Summary */}

        <View className='p-4 bg-white shadow-lg border-t border-gray-100'>
            <Text className='text-primary text-lg font-bold mb-4'>Order Summary</Text>

            {/* Subtotal */}
            <View className='flex-row justify-between mb-2'>
                <Text className='text-secondary '>Subtotal</Text>
                <Text className='font-bold'>${cartTotal.toFixed(2)}</Text>
            </View>

            {/* Shipping */}
            <View className='flex-row justify-between mb-2'>
                <Text className='text-secondary '>Shipping</Text>
                <Text className='font-bold'>${shipping.toFixed(2)}</Text>
            </View>

            {/* Tax */}
            <View className='flex-row justify-between mb-2'>
                <Text className='text-secondary '>Tax</Text>
                <Text className='font-bold'>${tax.toFixed(2)}</Text>
            </View>

            {/* Total */}
            <View className='flex-row justify-between mb-2'>
                <Text className='text-primary font-bold text-xl '>Tax</Text>
                <Text className='text-primary font-bold text-xl'>${total.toFixed(2)}</Text>
            </View>

            {/* Place Order Button */}
            <TouchableOpacity
            onPress={handlePlaceOrder} disabled={loading}
            className={` rounded-xl p-4 mb-4 mt-2 items-center ${loading ? 'bg-gray-100' : 'bg-primary'}`}>
                {loading ? <ActivityIndicator color={'white'} /> : <Text className='text-white font-bold text-xl'>Place Order</Text>}
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}