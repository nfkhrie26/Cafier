import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, 
  TouchableOpacity, Switch, SafeAreaView, ActivityIndicator 
} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import api, { IMAGE_BASE_URL } from '../../../service/utils'; 

interface Product {
  id: string | number;
  name: string;
  image: string;
  is_ready?: boolean;
  category_id?: number | string; 
  stock?: number; 
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState<Product[]>([]);

  const fetchMenu = async () => {
    try {
      const response = await api.get('/products');
      const hasilData = response.data.data || response.data;
      setMenus(Array.isArray(hasilData) ? hasilData : []);
      setLoading(false);
    } catch (error) {
      console.error("Gagal ambil menu:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const toggleStatus = async (id: string | number, field: string, currentValue: boolean | undefined) => {
    try {
      setMenus(menus.map(item => item.id === id ? { ...item, [field]: !currentValue } : item));
      await api.put(`/products/${id}`, { [field]: !currentValue });
    } catch (error) {
      alert("Gagal update!");
      fetchMenu(); 
    }
  };

  const updateStock = async (id: string | number, newStock: number) => {
    if (newStock < 0) return;
    try {
      setMenus(menus.map(item => item.id === id ? { ...item, stock: newStock } : item));
      await api.put(`/products/${id}`, { stock: newStock });
    } catch (error) {
      alert("Gagal update stok!");
      fetchMenu();
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#3d2a1d" style={{flex:1}} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsRow}>
          <StatCard icon={<Feather name="coffee" size={24} color="#3d2a1d"/>} label="Menu" value={menus.length} />
          <StatCard icon={<Feather name="file-text" size={24} color="#3d2a1d"/>} label="Transaksi" value={35} />
          <StatCard icon={<Feather name="users" size={24} color="#3d2a1d"/>} label="Membership" value={50} />
        </View>

        <TouchableOpacity style={styles.btnStok}><Text style={styles.btnStokText}>Stok Menu</Text></TouchableOpacity>

        <View style={styles.gridContainer}>
          {menus.map((item) => {
            const dessertKeywords = ['Mochi', 'Croissant', 'Pie', 'Cake', 'Donat', 'Batagor'];
            const isDessert = String(item.category_id) === '384' || dessertKeywords.some(k => item.name.includes(k));

            return (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: `${IMAGE_BASE_URL}${item.image}` }} style={styles.menuImg} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.itemStatus, {color: (isDessert ? (item.stock || 0) > 0 : item.is_ready) ? '#4ade80' : '#ff4b4b'}]}>
                    {isDessert ? ((item.stock || 0) > 0 ? "Tersedia" : "Stok Habis") : (item.is_ready ? "Siap Disajikan" : "Stok Habis")}
                  </Text>
                </View>

                {isDessert ? (
                  <View style={styles.stockControl}>
                    <TouchableOpacity onPress={() => updateStock(item.id, (item.stock || 0) - 1)}><Feather name="minus-circle" size={24} color="#ff4b4b" /></TouchableOpacity>
                    <Text style={styles.stockText}>{item.stock || 0}</Text>
                    <TouchableOpacity onPress={() => updateStock(item.id, (item.stock || 0) + 1)}><Feather name="plus-circle" size={24} color="#4ade80" /></TouchableOpacity>
                  </View>
                ) : (
                  <Switch value={!!item.is_ready} onValueChange={() => toggleStatus(item.id, 'is_ready', item.is_ready)} trackColor={{ false: "#ff4b4b", true: "#4ade80" }} thumbColor="#f4f3f4" />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatCard = ({ icon, label, value }: { icon: any, label: string, value: number }) => (
  <View style={styles.statCard}><Text style={styles.statLabel}>{label}</Text><View style={styles.statContent}>{icon}<Text style={styles.statValue}>{value}</Text></View></View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3DAC9' },
  scrollContent: { padding: 15 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { backgroundColor: '#F5EEDC', padding: 15, borderRadius: 15, width: '31%', alignItems: 'center' },
  statLabel: { fontSize: 14, color: '#3d2a1d' },
  statContent: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  btnStok: { backgroundColor: '#CD833C', padding: 12, borderRadius: 10, alignItems: 'center', alignSelf: 'center', width: '40%', marginBottom: 20 },
  btnStokText: { color: '#fff', fontWeight: 'bold' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  itemCard: { backgroundColor: '#F5EEDC', flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 50, width: '48%', marginBottom: 15 },
  menuImg: { width: 45, height: 45, borderRadius: 25 },
  itemInfo: { flex: 1, marginLeft: 8 },
  itemName: { fontSize: 12, fontWeight: 'bold', color: '#3d2a1d' },
  itemStatus: { fontSize: 9 },
  stockControl: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  stockText: { fontSize: 14, fontWeight: 'bold', color: '#3d2a1d', minWidth: 20, textAlign: 'center' }
});

export default Dashboard;