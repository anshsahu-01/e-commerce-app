import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    RefreshControl,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { dummyProducts } from "@/assets/assets";

export default function AdminProducts() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const fetchProducts = async () => {
        try {
            setProducts(dummyProducts as any[]);
        } catch (error) {
            console.log("Failed to fetch products:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const performDelete = async (id: string) => {
        setProducts((prev) =>
            prev.filter((product: any) => product._id !== id)
        );
    };

    const deleteProduct = async (id: string) => {
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => performDelete(id),
                },
            ]
        );
    };

    if (loading && !refreshing) {
        return (
            <View className="flex-1 justify-center items-center bg-surface">
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-surface">
            {/* Header */}
            <View className="p-4 bg-white border border-gray-100 flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-primary">
                    Total Products ({products.length})
                </Text>

                <TouchableOpacity
                    onPress={() => router.push("/admin/products/add")}
                    className="bg-gray-800 px-4 py-2 rounded-full flex-row items-center"
                >
                    <Ionicons
                        name="add"
                        size={20}
                        color="white"
                    />

                    <Text className="text-white font-medium ml-1">
                        Add Product
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Products */}
            <ScrollView
                className="flex-1 p-2"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {products.length === 0 ? (
                    <View className="flex-1 justify-center items-center mt-20">
                        <Text className="text-secondary">
                            No products found
                        </Text>
                    </View>
                ) : (
                    products.map((product: any, index: number) => {
                        const imageUri =
                            Array.isArray(product.images) &&
                                product.images.length > 0
                                ? product.images[0]
                                : "https://via.placeholder.com/150";

                        const categoryName =
                            typeof product.category === "object"
                                ? product.category?.name
                                : product.category || "Others";

                        const sizesText = Array.isArray(product.sizes)
                            ? product.sizes.join(", ")
                            : product.sizes || "N/A";

                        const price = Number(product.price || 0).toFixed(2);

                        return (
                            <View
                                key={`${product._id || "product"}-${index}`}
                                className="bg-white p-3 rounded-lg border border-gray-100 mb-3 flex-row items-center"
                            >
                                {/* Product Image */}
                                <Image
                                    source={{ uri: imageUri }}
                                    className="w-16 h-16 rounded-lg bg-gray-100 mr-3"
                                    resizeMode="cover"
                                />

                                {/* Product Details */}
                                <View className="flex-1">
                                    <Text
                                        className="font-bold text-primary text-base"
                                        numberOfLines={1}
                                    >
                                        {product.name || "Unnamed Product"}
                                    </Text>

                                    <Text
                                        className="text-secondary text-xs mb-1"
                                        numberOfLines={1}
                                    >
                                        Category : {categoryName}
                                    </Text>

                                    <Text
                                        className="text-secondary text-xs mb-1"
                                        numberOfLines={1}
                                    >
                                        Stock : {product.stock ?? 0}
                                    </Text>

                                    <Text
                                        className="text-secondary text-xs mb-1"
                                        numberOfLines={1}
                                    >
                                        Sizes : {sizesText}
                                    </Text>

                                    <Text className="text-primary font-bold">
                                        ${price}
                                    </Text>
                                </View>

                                {/* Actions */}
                                <View className="flex-row items-center">
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push(
                                                `/admin/products/edit/${product._id}`
                                            )
                                        }
                                        className="p-2 bg-slate-50 rounded-full mr-2"
                                    >
                                        <Ionicons
                                            name="create-outline"
                                            size={18}
                                            color="#333333"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() =>
                                            deleteProduct(product._id)
                                        }
                                        className="p-2 bg-gray-50 rounded-full"
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={18}
                                            color="#333333"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
}