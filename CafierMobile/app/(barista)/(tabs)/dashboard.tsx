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
  is_available?: boolean; 
  category_id?: number | string; 
  stock?: number; 
  category?: { name: string }; 
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState<Product[]>([]);
  const [stats, setStats] = useState({ membership: 0, transaksi: 0 });
  const [activeCategory, setActiveCategory] = useState('Semua');

  const fetchData = async () => {
    try {
      const menuRes = await api.get('/products');
      const menuData = menuRes.data.data || menuRes.data;
      setMenus(Array.isArray(menuData) ? menuData : []);

      try {
        const dashRes = await api.get('/web/dashboard');
        if (dashRes.data?.data?.stats) {
          setStats({
            membership: dashRes.data.data.stats.membership || 0,
            transaksi: dashRes.data.data.stats.transaksi || 0,
          });
        }
      } catch (e) {
        console.log("Gagal tarik stats:", e);
      }

      setLoading(false);
    } catch (error) {
      console.error("Gagal ambil menu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleStatus = async (id: string | number, field: string, currentValue: boolean | undefined) => {
    try {
      setMenus(menus.map(item => item.id === id ? { ...item, [field]: !currentValue } : item));
      await api.put(`/products/${id}`, { [field]: !currentValue });
    } catch (error) {
      alert("Gagal update!");
      fetchData(); 
    }
  };

  const updateStock = async (id: string | number, newStock: number) => {
    if (newStock < 0) return;
    try {
      setMenus(menus.map(item => item.id === id ? { ...item, stock: newStock } : item));
      await api.put(`/products/${id}`, { stock: newStock });
    } catch (error) {
      alert("Gagal update stok!");
      fetchData();
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#3d2a1d" style={{flex:1}} />;

  // 🚨 BIKIN FUNGSI DETEKSI DESSERT BIAR RAPI
  const dessertKeywords = ['Mochi', 'Croissant', 'Pie', 'Cake', 'Donat', 'Batagor'];
  const checkIsDessert = (item: Product) => {
    return String(item.category_id) === '384' || dessertKeywords.some(keyword => item.name.includes(keyword));
  };

  // 1. Filter sesuai tab yang dipencet
  let filteredMenus = menus.filter(item => {
    if (activeCategory === 'Semua') return true;
    
    if (item.category && item.category.name) {
      return item.category.name === activeCategory;
    }

    const isDessert = checkIsDessert(item);
    
    if (activeCategory === 'Desserts') return isDessert;
    if (activeCategory === 'Coffee') return !isDessert && item.name.toLowerCase().includes('coffee');
    if (activeCategory === 'Non Coffee') return !isDessert && !item.name.toLowerCase().includes('coffee');

    return true;
  });

  // 🚨 2. SORTING MAKIN PINTER: Dessert dibuang ke bawah!
  filteredMenus.sort((a, b) => {
    const aIsDessert = checkIsDessert(a);
    const bIsDessert = checkIsDessert(b);

    // Kalau 'a' itu dessert dan 'b' bukan, 'a' taruh bawah (return 1)
    if (aIsDessert && !bIsDessert) return 1;
    // Kalau 'b' itu dessert dan 'a' bukan, 'b' taruh bawah (return -1)
    if (!aIsDessert && bIsDessert) return -1;
    
    // Kalau sama-sama dessert atau sama-sama minuman, baru urutin abjad A-Z
    return a.name.localeCompare(b.name);
  });

  const filterTabs = ['Semua', 'Coffee', 'Non Coffee', 'Desserts'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <StatCard icon={<Feather name="coffee" size={24} color="#3d2a1d"/>} label="Menu" value={menus.length} />
          <StatCard icon={<Feather name="file-text" size={24} color="#3d2a1d"/>} label="Transaksi" value={stats.transaksi} />
          <StatCard icon={<Feather name="users" size={24} color="#3d2a1d"/>} label="Membership" value={stats.membership} />
        </View>

        <TouchableOpacity style={styles.btnStok} activeOpacity={0.8}>
          <Text style={styles.btnStokText}>Stok Menu</Text>
        </TouchableOpacity>

        <View style={styles.filterContainer}>
          {filterTabs.map(cat => (
            <TouchableOpacity 
              key={cat}
              style={[styles.filterBtn, activeCategory === cat && styles.filterBtnActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.gridContainer}>
          {filteredMenus.map((item) => {
            const isDessert = checkIsDessert(item);

            let statusText = isDessert ? ((item.stock || 0) > 0 ? "Tersedia" : "Stok Habis") 
                                       : (item.is_available ? "Siap Disajikan" : "Stok Habis");
            let statusColor = (isDessert ? (item.stock || 0) > 0 : item.is_available) ? "#4ade80" : "#ff4b4b";

            return (
              <View key={item.id} style={styles.itemCard}>
                <Image 
                  source={item.image ? { uri: `${IMAGE_BASE_URL}${item.image}` } : require("@/assets/images/serene-logo.png")} 
                  style={styles.menuImg} 
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.itemStatus, {color: statusColor}]}>{statusText}</Text>
                </View>

                {isDessert ? (
                  <View style={styles.stockControl}>
                    <TouchableOpacity onPress={() => updateStock(item.id, (item.stock || 0) - 1)}>
                      <Feather name="minus-circle" size={24} color="#ff4b4b" />
                    </TouchableOpacity>
                    <Text style={styles.stockText}>{item.stock || 0}</Text>
                    <TouchableOpacity onPress={() => updateStock(item.id, (item.stock || 0) + 1)}>
                      <Feather name="plus-circle" size={24} color="#4ade80" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Switch 
                    value={!!item.is_available} 
                    onValueChange={() => toggleStatus(item.id, 'is_available', item.is_available)} 
                    trackColor={{ false: "#ff4b4b", true: "#4ade80" }}
                    thumbColor="#f4f3f4"
                  />
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
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <View style={styles.statContent}>{icon}<Text style={styles.statValue}>{value}</Text></View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3DAC9' },
  scrollContent: { padding: 15, paddingBottom: 50 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { backgroundColor: '#F5EEDC', padding: 15, borderRadius: 15, width: '31%', alignItems: 'center' },
  statLabel: { fontSize: 14, color: '#3d2a1d' },
  statContent: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  btnStok: { backgroundColor: '#CD833C', padding: 12, borderRadius: 10, alignItems: 'center', alignSelf: 'center', width: '40%', marginBottom: 20 },
  btnStokText: { color: '#fff', fontWeight: 'bold' },
  
  filterContainer: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 25 },
  filterBtn: { backgroundColor: '#F5EEDC', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, elevation: 1 },
  filterBtnActive: { backgroundColor: '#CD833C' },
  filterText: { color: '#3d2a1d', fontWeight: 'bold', fontSize: 14 },
  filterTextActive: { color: '#FFF' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  itemCard: { backgroundColor: '#F5EEDC', flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 50, width: '48%', marginBottom: 15, elevation: 1 },
  menuImg: { width: 45, height: 45, borderRadius: 25 },
  itemInfo: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 13, fontWeight: 'bold', color: '#3d2a1d' },
  itemStatus: { fontSize: 10, marginTop: 2, fontWeight: '600' },
  stockControl: { flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: 5 },
  stockText: { fontSize: 14, fontWeight: 'bold', color: '#3d2a1d', minWidth: 20, textAlign: 'center' }
});

export default Dashboard;