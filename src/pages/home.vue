<template>
  <div class="home-page bg-background">
    <HeroSection />
    <TrustedSection />
    <StatisticsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <ShowcaseSection />
    <AISection />
    <TestimonialsSection />
    <FAQSection />
    <CTASection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import TrustedSection from '@/components/home/TrustedSection.vue'
import StatisticsSection from '@/components/home/StatisticsSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
import ShowcaseSection from '@/components/home/ShowcaseSection.vue'
import AISection from '@/components/home/AISection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import FAQSection from '@/components/home/FAQSection.vue'
import CTASection from '@/components/home/CTASection.vue'
import FooterSection from '@/components/home/FooterSection.vue'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  transition: background-color 0.3s ease;
  font-family: 'Tajawal', 'Cairo', sans-serif;
}
</style>