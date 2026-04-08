import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const SUMMARY_DATA = [
  { id: '1', title: 'Menu', value: '20', icon: 'book-open' },
  { id: '2', title: 'Transaksi', value: '35', icon: 'receipt' },
  { id: '3', title: 'Membership', value: '50', icon: 'users' },
];

const DATA_HARIAN = [
  { label: 'senin', in: 60, out: 20, inNom: 'Rp600rb', outNom: 'Rp200rb' },
  { label: 'selasa', in: 60, out: 20, inNom: 'Rp600rb', outNom: 'Rp200rb' },
  { label: 'rabu', in: 40, out: 20, inNom: 'Rp400rb', outNom: 'Rp200rb' },
  { label: 'kamis', in: 110, out: 70, inNom: 'Rp1.1jt', outNom: 'Rp700rb' },
  { label: 'jumat', in: 40, out: 30, inNom: 'Rp400rb', outNom: 'Rp300rb' },
  { label: 'sabtu', in: 50, out: 20, inNom: 'Rp500rb', outNom: 'Rp200rb' },
  { label: 'minggu', in: 50, out: 20, inNom: 'Rp500rb', outNom: 'Rp200rb' },
];

const DATA_MINGGUAN = [
  { label: 'Minggu 1', in: 90, out: 50, inNom: 'Rp3.5jt', outNom: 'Rp1.5jt' },
  { label: 'Minggu 2', in: 120, out: 80, inNom: 'Rp4.2jt', outNom: 'Rp2.1jt' },
  { label: 'Minggu 3', in: 70, out: 40, inNom: 'Rp2.8jt', outNom: 'Rp1.2jt' },
  { label: 'Minggu 4', in: 100, out: 60, inNom: 'Rp3.9jt', outNom: 'Rp1.8jt' },
];

const DATA_BULANAN = [
  { label: 'Jan', in: 80, out: 40, inNom: 'Rp15jt', outNom: 'Rp8jt' },
  { label: 'Feb', in: 100, out: 50, inNom: 'Rp18jt', outNom: 'Rp10jt' },
  { label: 'Mar', in: 130, out: 70, inNom: 'Rp22jt', outNom: 'Rp12jt' },
  { label: 'Apr', in: 90, out: 60, inNom: 'Rp16jt', outNom: 'Rp11jt' },
  { label: 'Mei', in: 110, out: 50, inNom: 'Rp20jt', outNom: 'Rp9jt' },
];

export default function HomeTab() {
  const [filter, setFilter] = useState('Harian');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);

  const getChartData = () => {
    if (filter === 'Mingguan') return DATA_MINGGUAN;
    if (filter === 'Bulanan') return DATA_BULANAN;
    return DATA_HARIAN;
  };

  const chartData = getChartData();

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.cardsContainer}>
        {SUMMARY_DATA.map((item) => (
          <View key={item.id} style={styles.summaryCard}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <FontAwesome5 name={item.icon} size={40} color="#4A3728" style={styles.cardIcon} />
            <Text style={styles.cardValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTotal}>Rp1.200.000</Text>
          <View style={{ zIndex: 10 }}> 
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Text style={styles.dropdownText}>{filter}</Text>
              <Ionicons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={16} color="#FFF" />
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {['Harian', 'Mingguan', 'Bulanan'].map((option) => (
                  <TouchableOpacity key={option} style={styles.dropdownMenuItem} onPress={() => { setFilter(option); setIsDropdownOpen(false); setActiveBarIndex(null); }}>
                    <Text style={styles.dropdownMenuText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#2ecc71' }]} /><Text style={styles.legendText}>Pemasukan</Text></View>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#ff4757' }]} /><Text style={styles.legendText}>Pengeluaran</Text></View>
        </View>

        <View style={styles.barChartContainer}>
          {chartData.map((data, index) => (
            <View key={index} style={styles.barWrapper}>
              {activeBarIndex === index && (
                <View style={styles.tooltipBox}>
                  <Text style={styles.tooltipTextIn}>+ {data.inNom}</Text>
                  <Text style={styles.tooltipTextOut}>- {data.outNom}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.barsGroup} activeOpacity={0.8} onPress={() => setActiveBarIndex(activeBarIndex === index ? null : index)}>
                <View style={[styles.bar, { backgroundColor: '#2ecc71', height: data.in }]} />
                <View style={[styles.bar, { backgroundColor: '#ff4757', height: data.out }]} />
              </TouchableOpacity>
              <Text style={styles.barLabel}>{data.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 40 },
  summaryCard: { backgroundColor: '#F9EDD6', borderRadius: 15, paddingVertical: 20, paddingHorizontal: 40, alignItems: 'center', width: 180, elevation: 3 },
  cardTitle: { fontSize: 16, color: '#4A3728', marginBottom: 15 },
  cardIcon: { marginBottom: 15 },
  cardValue: { fontSize: 22, color: '#4A3728' },
  chartSection: { backgroundColor: '#F9EDD6', borderRadius: 25, padding: 30, width: '85%', maxWidth: 900, alignItems: 'center', elevation: 4, zIndex: 1 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 20 },
  chartTotal: { fontSize: 48, fontWeight: 'bold', color: '#2ecc71' },
  dropdownButton: { flexDirection: 'row', backgroundColor: '#422918', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, alignItems: 'center', minWidth: 120, justifyContent: 'space-between' },
  dropdownText: { color: '#FFF', marginRight: 8, fontSize: 16 },
  dropdownMenu: { position: 'absolute', top: 50, right: 0, backgroundColor: '#FFF', borderRadius: 10, width: 150, elevation: 5 },
  dropdownMenuItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  dropdownMenuText: { fontSize: 16, color: '#422918' },
  legendContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 40 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  legendDot: { width: 15, height: 15, borderRadius: 8, marginRight: 8 },
  legendText: { fontSize: 18, color: '#7f8c8d', fontWeight: '500' },
  barChartContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '90%', height: 150, alignItems: 'flex-end', marginBottom: 40 },
  barWrapper: { alignItems: 'center', position: 'relative' },
  barsGroup: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10, paddingHorizontal: 10 },
  bar: { width: 16, borderTopLeftRadius: 10, borderTopRightRadius: 10, marginHorizontal: 2 },
  barLabel: { fontSize: 16, color: '#000', fontWeight: 'bold' },
  tooltipBox: { position: 'absolute', bottom: '100%', marginBottom: 15, backgroundColor: '#333', padding: 8, borderRadius: 8, alignItems: 'center', width: 90, elevation: 5, zIndex: 20 },
  tooltipTextIn: { color: '#2ecc71', fontWeight: 'bold', fontSize: 12 },
  tooltipTextOut: { color: '#ff4757', fontWeight: 'bold', fontSize: 12, marginTop: 2 },
});