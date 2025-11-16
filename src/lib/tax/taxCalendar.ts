/**
 * Thai Tax Calendar
 * Important tax deadlines and filing dates
 */

export interface TaxDeadline {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  type: 'personal' | 'corporate' | 'vat' | 'social-security' | 'other';
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual' | 'one-time';
  day: number; // Day of month
  month?: number; // Month (1-12) for annual deadlines
  isRecurring: boolean;
  penalty?: string;
  penaltyTh?: string;
  priority: 'high' | 'medium' | 'low';
}

export const TAX_DEADLINES: TaxDeadline[] = [
  // Personal Income Tax
  {
    id: 'personal-tax-paper',
    title: 'Personal Income Tax (Paper Filing)',
    titleTh: 'ยื่นภาษีเงินได้บุคคลธรรมดา (กระดาษ)',
    description: 'File annual personal income tax return (paper form)',
    descriptionTh: 'ยื่นแบบแสดงรายการภาษีเงินได้บุคคลธรรมดาแบบกระดาษ',
    type: 'personal',
    frequency: 'annual',
    day: 31,
    month: 3, // March 31
    isRecurring: true,
    penalty: 'Up to 2,000 THB/month + 1.5% monthly interest',
    penaltyTh: 'ปรับสูงสุด 2,000 บาท/เดือน + ดอกเบี้ย 1.5%/เดือน',
    priority: 'high',
  },
  {
    id: 'personal-tax-online',
    title: 'Personal Income Tax (Online Filing)',
    titleTh: 'ยื่นภาษีเงินได้บุคคลธรรมดา (ออนไลน์)',
    description: 'File annual personal income tax return (e-Filing)',
    descriptionTh: 'ยื่นแบบแสดงรายการภาษีเงินได้บุคคลธรรมดาออนไลน์',
    type: 'personal',
    frequency: 'annual',
    day: 8,
    month: 4, // April 8
    isRecurring: true,
    penalty: 'Up to 2,000 THB/month + 1.5% monthly interest',
    penaltyTh: 'ปรับสูงสุด 2,000 บาท/เดือน + ดอกเบี้ย 1.5%/เดือน',
    priority: 'high',
  },
  {
    id: 'mid-year-filing',
    title: 'Mid-Year Tax Filing (Business)',
    titleTh: 'ยื่นภาษีครึ่งปี (ธุรกิจ)',
    description: 'File mid-year tax return for business income (Jan-Jun)',
    descriptionTh: 'ยื่นภาษีเงินได้ครึ่งปีสำหรับรายได้จากธุรกิจ (ม.ค.-มิ.ย.)',
    type: 'personal',
    frequency: 'semi-annual',
    day: 30,
    month: 9, // September 30
    isRecurring: true,
    penalty: 'Up to 2,000 THB/month + 1.5% monthly interest',
    penaltyTh: 'ปรับสูงสุด 2,000 บาท/เดือน + ดอกเบี้ย 1.5%/เดือน',
    priority: 'medium',
  },

  // VAT
  {
    id: 'vat-monthly',
    title: 'Monthly VAT Return',
    titleTh: 'ยื่นแบบ ภ.พ.30 รายเดือน',
    description: 'File monthly VAT return by 15th of each month',
    descriptionTh: 'ยื่นแบบแสดงรายการภาษีมูลค่าเพิ่มรายเดือนภายในวันที่ 15',
    type: 'vat',
    frequency: 'monthly',
    day: 15,
    isRecurring: true,
    penalty: 'Up to 2,000 THB + 1.5% monthly interest',
    penaltyTh: 'ปรับสูงสุด 2,000 บาท + ดอกเบี้ย 1.5%/เดือน',
    priority: 'high',
  },

  // Social Security
  {
    id: 'social-security-monthly',
    title: 'Social Security Contribution',
    titleTh: 'ส่งเงินสมทบประกันสังคม',
    description: 'Pay social security contributions by 15th of each month',
    descriptionTh: 'ชำระเงินสมทบประกันสังคมภายในวันที่ 15 ของทุกเดือน',
    type: 'social-security',
    frequency: 'monthly',
    day: 15,
    isRecurring: true,
    penalty: '2% monthly surcharge',
    penaltyTh: 'เบี้ยปรับ 2% ต่อเดือน',
    priority: 'high',
  },

  // Corporate Tax
  {
    id: 'corporate-tax-annual',
    title: 'Corporate Income Tax',
    titleTh: 'ภาษีเงินได้นิติบุคคล',
    description: 'File within 150 days after accounting period ends',
    descriptionTh: 'ยื่นภายใน 150 วันหลังสิ้นรอบระยะเวลาบัญชี',
    type: 'corporate',
    frequency: 'annual',
    day: 150, // Days after year-end
    isRecurring: true,
    penalty: 'Up to 2,000 THB/month + 1.5% monthly interest',
    penaltyTh: 'ปรับสูงสุด 2,000 บาท/เดือน + ดอกเบี้ย 1.5%/เดือน',
    priority: 'high',
  },

  // Withholding Tax
  {
    id: 'withholding-tax-monthly',
    title: 'Withholding Tax Return',
    titleTh: 'ยื่นแบบหัก ณ ที่จ่าย',
    description: 'File withholding tax return by 7th of following month',
    descriptionTh: 'ยื่นแบบภาษีหัก ณ ที่จ่ายภายในวันที่ 7 ของเดือนถัดไป',
    type: 'other',
    frequency: 'monthly',
    day: 7,
    isRecurring: true,
    penalty: 'Penalties may apply',
    penaltyTh: 'อาจมีค่าปรับ',
    priority: 'medium',
  },

  // Special 2025 Events
  {
    id: 'easy-e-receipt-2025',
    title: 'Easy E-Receipt 2.0 Program',
    titleTh: 'โครงการอีซี่ อี-รีซีท 2.0',
    description: 'Tax deduction program ends (max 50,000 THB deduction)',
    descriptionTh: 'โครงการลดหย่อนภาษีสิ้นสุด (ลดหย่อนสูงสุด 50,000 บาท)',
    type: 'other',
    frequency: 'one-time',
    day: 28,
    month: 2, // February 28, 2025
    isRecurring: false,
    priority: 'medium',
  },
  {
    id: 'vat-rate-expiry',
    title: 'VAT Rate 7% Expires',
    titleTh: 'อัตราภาษีมูลค่าเพิ่ม 7% สิ้นสุด',
    description: 'Current 7% VAT rate expires, may increase to 10%',
    descriptionTh: 'อัตราภาษี 7% สิ้นสุด อาจเพิ่มเป็น 10%',
    type: 'vat',
    frequency: 'one-time',
    day: 30,
    month: 9, // September 30, 2025
    isRecurring: false,
    priority: 'high',
  },
  {
    id: 'welfare-fund-start',
    title: 'Employee Welfare Fund Starts',
    titleTh: 'กองทุนสวัสดิการแรงงานเริ่มต้น',
    description: 'New 0.25% employee welfare fund contribution begins',
    descriptionTh: 'เริ่มจ่ายเงินสมทบกองทุน 0.25%',
    type: 'social-security',
    frequency: 'one-time',
    day: 1,
    month: 10, // October 1, 2025
    isRecurring: false,
    priority: 'medium',
  },
  {
    id: 'reduced-wht-expires',
    title: 'Reduced Withholding Tax Rates Expire',
    titleTh: 'อัตราภาษีหัก ณ ที่จ่าย 1% สิ้นสุด',
    description: 'Temporary 1% e-filing WHT rates expire (return to standard)',
    descriptionTh: 'อัตราภาษีพิเศษ 1% สำหรับ e-filing สิ้นสุด',
    type: 'other',
    frequency: 'one-time',
    day: 31,
    month: 12, // December 31, 2025
    isRecurring: false,
    priority: 'high',
  },
];

/**
 * Get upcoming deadlines
 */
export function getUpcomingDeadlines(
  count: number = 5,
  currentDate: Date = new Date()
): TaxDeadline[] {
  const upcoming: Array<TaxDeadline & { dueDate: Date }> = [];

  TAX_DEADLINES.forEach((deadline) => {
    if (!deadline.isRecurring && deadline.month) {
      // One-time events
      const dueDate = new Date(currentDate.getFullYear(), deadline.month - 1, deadline.day);

      if (dueDate >= currentDate) {
        upcoming.push({ ...deadline, dueDate });
      }
    } else if (deadline.isRecurring) {
      // Recurring events
      if (deadline.month) {
        // Annual
        const dueDate = new Date(currentDate.getFullYear(), deadline.month - 1, deadline.day);
        if (dueDate >= currentDate) {
          upcoming.push({ ...deadline, dueDate });
        }
      } else {
        // Monthly
        const thisMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          deadline.day
        );
        const nextMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          deadline.day
        );

        if (thisMonth >= currentDate) {
          upcoming.push({ ...deadline, dueDate: thisMonth });
        } else {
          upcoming.push({ ...deadline, dueDate: nextMonth });
        }
      }
    }
  });

  // Sort by date
  upcoming.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return upcoming.slice(0, count);
}

/**
 * Get deadlines for a specific month
 */
export function getDeadlinesForMonth(month: number, year: number): TaxDeadline[] {
  return TAX_DEADLINES.filter((deadline) => {
    if (deadline.month) {
      return deadline.month === month;
    }
    return deadline.isRecurring;
  });
}

/**
 * Check if today has any deadlines
 */
export function getTodayDeadlines(currentDate: Date = new Date()): TaxDeadline[] {
  const today = currentDate.getDate();
  const thisMonth = currentDate.getMonth() + 1;

  return TAX_DEADLINES.filter((deadline) => {
    if (deadline.month && deadline.month === thisMonth && deadline.day === today) {
      return true;
    }
    if (!deadline.month && deadline.day === today) {
      return true;
    }
    return false;
  });
}

/**
 * Get days until deadline
 */
export function getDaysUntilDeadline(deadline: TaxDeadline, currentDate: Date = new Date()): number {
  let dueDate: Date;

  if (deadline.month) {
    dueDate = new Date(currentDate.getFullYear(), deadline.month - 1, deadline.day);
  } else {
    // Next occurrence of this day
    const thisMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      deadline.day
    );
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      deadline.day
    );

    dueDate = thisMonth >= currentDate ? thisMonth : nextMonth;
  }

  const diff = dueDate.getTime() - currentDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
