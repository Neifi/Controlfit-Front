package es.neifi.GestionGymAPI.services;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.apache.commons.net.ntp.NTPUDPClient;
import org.apache.commons.net.ntp.TimeInfo;
import org.springframework.stereotype.Service;

@Service()
public class ServerTime {

	public static Date getNTPDate() {
		// Spain server
		String[] hosts = new String[] { "0.es.pool.ntp.org"};

		NTPUDPClient client = new NTPUDPClient();
		client.setDefaultTimeout(5000);

		for (String host : hosts) {

			try {
				InetAddress hostAddr = InetAddress.getByName(host);
				TimeInfo info = client.getTime(hostAddr);
				Date date = new Date(info.getMessage().getTransmitTimeStamp().getTime());
				
				//TODO LocalDateTime date = LocalDateTime.ofInstant(Instant.ofEpochMilli(info.getMessage().getTransmitTimeStamp().getTime()), TimeZone.getDefault().toZoneId());

				return date;

			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		client.close();

		return null;

	}
	
	public static long getDateDiff(Date startDate, Date endDate, TimeUnit timeUnit) {
	    long diffInMillies = endDate.getTime() - startDate.getTime();
	    return timeUnit.convert(diffInMillies,TimeUnit.MILLISECONDS);
	}
}
