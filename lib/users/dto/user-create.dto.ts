import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsAlpha,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    required: true,
    type: String,
    example: 'john.smith@gmail.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber(
    'AC' ||
      'AD' ||
      'AE' ||
      'AF' ||
      'AG' ||
      'AI' ||
      'AL' ||
      'AM' ||
      'AO' ||
      'AR' ||
      'AS' ||
      'AT' ||
      'AU' ||
      'AW' ||
      'AX' ||
      'AZ' ||
      'BA' ||
      'BB' ||
      'BD' ||
      'BE' ||
      'BF' ||
      'BG' ||
      'BH' ||
      'BI' ||
      'BJ' ||
      'BL' ||
      'BM' ||
      'BN' ||
      'BO' ||
      'BQ' ||
      'BR' ||
      'BS' ||
      'BT' ||
      'BW' ||
      'BY' ||
      'BZ' ||
      'CA' ||
      'CC' ||
      'CD' ||
      'CF' ||
      'CG' ||
      'CH' ||
      'CI' ||
      'CK' ||
      'CL' ||
      'CM' ||
      'CN' ||
      'CO' ||
      'CR' ||
      'CU' ||
      'CV' ||
      'CW' ||
      'CX' ||
      'CY' ||
      'CZ' ||
      'DE' ||
      'DJ' ||
      'DK' ||
      'DM' ||
      'DO' ||
      'DZ' ||
      'EC' ||
      'EE' ||
      'EG' ||
      'EH' ||
      'ER' ||
      'ES' ||
      'ET' ||
      'FI' ||
      'FJ' ||
      'FK' ||
      'FM' ||
      'FO' ||
      'FR' ||
      'GA' ||
      'GB' ||
      'GD' ||
      'GE' ||
      'GF' ||
      'GG' ||
      'GH' ||
      'GI' ||
      'GL' ||
      'GM' ||
      'GN' ||
      'GP' ||
      'GQ' ||
      'GR' ||
      'GT' ||
      'GU' ||
      'GW' ||
      'GY' ||
      'HK' ||
      'HN' ||
      'HR' ||
      'HT' ||
      'HU' ||
      'ID' ||
      'IE' ||
      'IL' ||
      'IM' ||
      'IN' ||
      'IO' ||
      'IQ' ||
      'IR' ||
      'IS' ||
      'IT' ||
      'JE' ||
      'JM' ||
      'JO' ||
      'JP' ||
      'KE' ||
      'KG' ||
      'KH' ||
      'KI' ||
      'KM' ||
      'KN' ||
      'KP' ||
      'KR' ||
      'KW' ||
      'KY' ||
      'KZ' ||
      'LA' ||
      'LB' ||
      'LC' ||
      'LI' ||
      'LK' ||
      'LR' ||
      'LS' ||
      'LT' ||
      'LU' ||
      'LV' ||
      'LY' ||
      'MA' ||
      'MC' ||
      'MD' ||
      'ME' ||
      'MF' ||
      'MG' ||
      'MH' ||
      'MK' ||
      'ML' ||
      'MM' ||
      'MN' ||
      'MO' ||
      'MP' ||
      'MQ' ||
      'MR' ||
      'MS' ||
      'MT' ||
      'MU' ||
      'MV' ||
      'MW' ||
      'MX' ||
      'MY' ||
      'MZ' ||
      'NA' ||
      'NC' ||
      'NE' ||
      'NF' ||
      'NG' ||
      'NI' ||
      'NL' ||
      'NO' ||
      'NP' ||
      'NR' ||
      'NU' ||
      'NZ' ||
      'OM' ||
      'PA' ||
      'PE' ||
      'PF' ||
      'PG' ||
      'PH' ||
      'PK' ||
      'PL' ||
      'PM' ||
      'PR' ||
      'PS' ||
      'PT' ||
      'PW' ||
      'PY' ||
      'QA' ||
      'RE' ||
      'RO' ||
      'RS' ||
      'RU' ||
      'RW' ||
      'SA' ||
      'SB' ||
      'SC' ||
      'SD' ||
      'SE' ||
      'SG' ||
      'SH' ||
      'SI' ||
      'SJ' ||
      'SK' ||
      'SL' ||
      'SM' ||
      'SN' ||
      'SO' ||
      'SR' ||
      'SS' ||
      'ST' ||
      'SV' ||
      'SX' ||
      'SY' ||
      'SZ' ||
      'TA' ||
      'TC' ||
      'TD' ||
      'TG' ||
      'TH' ||
      'TJ' ||
      'TK' ||
      'TL' ||
      'TM' ||
      'TN' ||
      'TO' ||
      'TR' ||
      'TT' ||
      'TV' ||
      'TW' ||
      'TZ' ||
      'UA' ||
      'UG' ||
      'US' ||
      'UY' ||
      'UZ' ||
      'VA' ||
      'VC' ||
      'VE' ||
      'VG' ||
      'VI' ||
      'VN' ||
      'VU' ||
      'WF' ||
      'WS' ||
      'XK' ||
      'YE' ||
      'YT' ||
      'ZA' ||
      'ZM' ||
      'ZW',
  )
  @ApiProperty({ example: '+1 888-888-8888' })
  phone: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({ required: true, example: 'JohnSmith' })
  username: string;

  @IsOptional()
  @IsAlpha()
  @MinLength(2)
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsOptional()
  @IsAlpha()
  @MinLength(2)
  @ApiProperty({ example: 'Smith' })
  lastName: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: '095ee216@',
    },
  )
  @ApiProperty({ required: true, example: 'Password' })
  password: string;
}
