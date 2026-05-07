<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Pemilik - Serene</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <!-- Tambahkan CDN Chart.js di sini -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="m-0 p-0 bg-[#e3dac9] font-sans min-h-screen text-gray-800">

    <!-- Navbar -->
    <nav class="w-full bg-[#3d2a1d] px-8 py-3 flex justify-between items-center shadow-md relative">
        
        <!-- Bagian Kiri: Logo -->
        <div class="flex items-center">
            <img src="{{ asset('images/logo.png') }}" alt="Serene Logo" class="h-25 object-contain">
        </div>
        
        <!-- Bagian Tengah: Judul -->
        <h1 class="text-white text-[28px] font-normal tracking-wide absolute left-1/2 transform -translate-x-1/2 m-0 whitespace-nowrap">
            Welcome back Pemilik
        </h1>
        
        <!-- Bagian Kanan: Profile Picture -->
        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent">
            <img src="https://ui-avatars.com/api/?name=Pemilik&background=c27d42&color=fff" alt="Profile" class="w-full h-full object-cover">
        </div>
        
    </nav>

    <!-- Main Content -->
    <main class="max-w-[1000px] mx-auto pt-10 pb-12 px-6">
        
        <!-- Navigation Pills (Sub-menu) -->
        <div class="flex justify-center mb-12">
            <div class="bg-[#a88669] rounded-full flex items-center p-1 shadow-sm overflow-hidden">
                <a href="{{ route('dashboard') }}" class="bg-[#3d2a1d] text-white px-8 py-2.5 rounded-full text-sm font-medium transition-colors">Home</a>
                <a href="{{ route('menu.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Menu</a>
                <a href="{{ route('membership.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Membership</a>
                <a href="{{ route('karyawan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Karyawan</a>
                <a href="{{ route('keuangan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pengeluaran Dan Pemasukan</a>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-3 gap-8 mb-10">
            <!-- Card 1: Menu -->
            <div class="bg-[#f5eedc] rounded-2xl py-6 flex flex-col items-center justify-center shadow-sm">
                <span class="text-[#3a2215] text-[17px] mb-3">Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11 text-[#3d2a1d] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="text-[#3a2215] font-semibold text-xl">20</span>
            </div>

            <!-- Card 2: Karyawan -->
            <div class="bg-[#f5eedc] rounded-2xl py-6 flex flex-col items-center justify-center shadow-sm">
                <span class="text-[#3a2215] text-[17px] mb-3">Karyawan</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11 text-[#3d2a1d] mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a2.25 2.25 0 00-2.25-2.25h-4.5A2.25 2.25 0 007.5 6zM15 6.75V6a.75.75 0 00-.75-.75h-4.5A.75.75 0 009 6v.75h6z" clip-rule="evenodd" />
                </svg>
                <span class="text-[#3a2215] font-semibold text-xl">15</span>
            </div>

            <!-- Card 3: Membership -->
            <div class="bg-[#f5eedc] rounded-2xl py-6 flex flex-col items-center justify-center shadow-sm">
                <span class="text-[#3a2215] text-[17px] mb-3">Membership</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11 text-[#3d2a1d] mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                <span class="text-[#3a2215] font-semibold text-xl">50</span>
            </div>
        </div>

        <!-- Keuangan Card (Chart Area) -->
        <div class="bg-[#f5eedc] rounded-3xl p-10 shadow-sm relative">
            
            <div class="flex justify-between items-start mb-6">
                <!-- Tambahin ID biar angkanya juga bisa ikut berubah nantinya -->
                <h2 id="totalUang" class="text-[#2bd965] text-[42px] font-bold leading-none">Rp1.200.000</h2>
                
                <div class="flex flex-col items-end gap-4">
                    <!-- Dropdown Harian / Tambah ID dan Value -->
                    <div class="relative inline-block">
                        <select id="filterWaktu" class="bg-[#3d2a1d] text-white pl-4 pr-8 py-1.5 rounded-full text-sm outline-none border-none cursor-pointer appearance-none min-w-[110px]">
                            <option value="harian">Harian</option>
                            <option value="mingguan">Mingguan</option>
                            <option value="bulanan">Bulanan</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                            </svg>
                        </div>
                    </div>
                    
                    <div class="flex gap-5">
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded-full bg-[#2bd965]"></div>
                            <span class="text-[#6b6b6b] font-medium text-[15px]">Pemasukan</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded-full bg-[#ff4b4b]"></div>
                            <span class="text-[#6b6b6b] font-medium text-[15px]">Pengeluaran</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Area Grafik Chart.js (Tombol Detail dibuang) -->
            <div class="h-[240px] w-full mt-8 px-4">
                <canvas id="financeChart"></canvas>
            </div>

        </div>
    </main>

    <!-- Script untuk menjalankan Grafik -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('financeChart').getContext('2d');
            
            // =================================================================
            // AREA DATA DUMMY DINAMIS
            // Ini disiapkan berdasarkan filter (Harian, Mingguan, Bulanan)
            // =================================================================
            const chartData = {
                harian: {
                    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                    pemasukan: [800000, 950000, 600000, 1200000, 700000, 850000, 900000],
                    pengeluaran: [300000, 400000, 250000, 700000, 350000, 400000, 300000],
                    total: 'Rp1.200.000'
                },
                mingguan: {
                    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
                    pemasukan: [4500000, 5200000, 3800000, 6100000],
                    pengeluaran: [1800000, 2100000, 1500000, 2400000],
                    total: 'Rp8.400.000'
                },
                bulanan: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
                    pemasukan: [15000000, 18000000, 16000000, 21000000, 19000000, 22000000, 24000000, 23000000, 25000000, 28000000, 26000000, 32000000],
                    pengeluaran: [6000000, 7000000, 6500000, 8000000, 7500000, 9000000, 9500000, 8500000, 10000000, 11000000, 10500000, 14000000],
                    total: 'Rp45.000.000'
                }
            };

            // Inisialisasi Chart awal pakai data 'harian'
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.harian.labels,
                    datasets: [
                        {
                            label: 'Pemasukan',
                            data: chartData.harian.pemasukan,
                            backgroundColor: '#2bd965', 
                            borderRadius: 20, 
                            borderSkipped: false,
                            barPercentage: 0.5,
                            categoryPercentage: 0.5
                        },
                        {
                            label: 'Pengeluaran',
                            data: chartData.harian.pengeluaran,
                            backgroundColor: '#ff4b4b', 
                            borderRadius: 20,
                            borderSkipped: false,
                            barPercentage: 0.5,
                            categoryPercentage: 0.5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false 
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            display: false, 
                            beginAtZero: true
                        },
                        x: {
                            grid: {
                                display: false, 
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    weight: 'bold',
                                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                },
                                color: '#3a2215'
                            }
                        }
                    }
                }
            });

            // =================================================================
            // LOGIKA SAAT DROPDOWN DIUBAH
            // =================================================================
            const filterDropdown = document.getElementById('filterWaktu');
            const totalUangText = document.getElementById('totalUang');

            filterDropdown.addEventListener('change', function() {
                const selectedValue = this.value; // 'harian', 'mingguan', atau 'bulanan'
                
                // Update Angka Total Uang
                totalUangText.innerText = chartData[selectedValue].total;

                // Update Labels X-Axis
                myChart.data.labels = chartData[selectedValue].labels;
                
                // Update Data Batang Pemasukan (Index 0) dan Pengeluaran (Index 1)
                myChart.data.datasets[0].data = chartData[selectedValue].pemasukan;
                myChart.data.datasets[1].data = chartData[selectedValue].pengeluaran;
                
                // Render ulang grafiknya!
                myChart.update();
            });
        });
    </script>
</body>
</html>