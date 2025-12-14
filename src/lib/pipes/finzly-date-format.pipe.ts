import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finzlyDateFormat',
  standalone: true
})
export class FinzlyDateFormatPipe implements PipeTransform {
  transform(value: Date | string | null, format: string = 'MM/dd/yyyy', timezone?: string): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;
    
    if (isNaN(date.getTime())) return '';

    // Apply timezone offset if provided
    const workingDate = timezone ? this.applyTimezone(date, timezone) : date;

    return this.formatDate(workingDate, format);
  }

  private applyTimezone(date: Date, timezone: string): Date {
    try {
      // Create formatter with timezone
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const parts = formatter.formatToParts(date);
      const getPart = (type: string) => parts.find(p => p.type === type)?.value || '0';

      return new Date(
        parseInt(getPart('year')),
        parseInt(getPart('month')) - 1,
        parseInt(getPart('day')),
        parseInt(getPart('hour')),
        parseInt(getPart('minute')),
        parseInt(getPart('second'))
      );
    } catch (e) {
      console.warn(`Invalid timezone: ${timezone}. Using original date.`);
      return date;
    }
  }

  private formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const hours12 = date.getHours() % 12 || 12;
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return format
      .replace('yyyy', String(year))
      .replace('yy', String(year).slice(-2))
      .replace('MMMM', this.getMonthName(date.getMonth(), 'long'))
      .replace('MMM', this.getMonthName(date.getMonth(), 'short'))
      .replace('MM', month)
      .replace('M', String(date.getMonth() + 1))
      .replace('dd', day)
      .replace('d', String(date.getDate()))
      .replace('HH', hours)
      .replace('hh', String(hours12).padStart(2, '0'))
      .replace('h', String(hours12))
      .replace('mm', minutes)
      .replace('ss', seconds)
      .replace('a', ampm.toLowerCase())
      .replace('A', ampm);
  }

  private getMonthName(monthIndex: number, format: 'long' | 'short'): string {
    const months = {
      long: ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December'],
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
    return months[format][monthIndex];
  }
}

